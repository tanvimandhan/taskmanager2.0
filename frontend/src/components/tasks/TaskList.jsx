import { useState } from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Eye, Plus } from 'lucide-react';
import { TaskForm } from './TaskForm';
import { TaskDetails } from './TaskDetails';
import { TaskFilters } from './TaskFilters';

export function TaskList() {
  const { tasks, deleteTask } = useTasks();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [viewingTask, setViewingTask] = useState<string | null>(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-secondary';
      case 'low': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'todo': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const canEditTask = (task) => {
    return user?.role === 'admin' || task.assignedTo === user?.id || task.createdBy === user?.id;
  };

  const handleEdit = (taskId) => {
    setEditingTask(taskId);
    setShowForm(true);
  };

  const handleView = (taskId) => {
    setViewingTask(taskId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      <TaskFilters />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              </div>
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Assigned to:</strong> {task.assignedToName}</p>
                <p><strong>Due date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                {task.documents.length > 0 && (
                  <p><strong>Documents:</strong> {task.documents.length} attached</p>
                )}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleView(task.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
                
                {canEditTask(task) && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(task.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteTask(task.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <TaskForm
          taskId={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {viewingTask && (
        <TaskDetails
          taskId={viewingTask}
          onClose={() => setViewingTask(null)}
        />
      )}
    </div>
  );
}