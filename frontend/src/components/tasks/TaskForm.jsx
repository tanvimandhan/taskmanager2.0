import { useState, useEffect } from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileUpload } from './FileUpload';
import { useToast } from '@/hooks/use-toast';


export function TaskForm({ taskId, onClose }) {
  const { tasks, createTask, updateTask } = useTasks();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' ,
    priority: 'medium',
    dueDate: '',
    assignedTo: user?.id || '',
    assignedToName: user?.name || '',
    documents: [] 
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskId) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
          assignedTo: task.assignedTo,
          assignedToName: task.assignedToName,
          documents: task.documents
        });
      }
    }
  }, [taskId, tasks]);

  const validateForm = () => {
    const newErrors= {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (taskId) {
      updateTask(taskId, formData);
      toast({
        title: 'Task updated',
        description: 'Task has been updated successfully'
      });
    } else {
      createTask(formData);
      toast({
        title: 'Task created',
        description: 'Task has been created successfully'
      });
    }
    
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentsChange = (documents) => {
    setFormData(prev => ({ ...prev, documents }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{taskId ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the task
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
            />
            {errors.dueDate && (
              <p className="text-sm text-destructive">{errors.dueDate}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="assignedToName">Assigned To</Label>
            <Input
              id="assignedToName"
              value={formData.assignedToName}
              onChange={(e) => handleChange('assignedToName', e.target.value)}
              placeholder="Enter assignee name"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Documents (PDF only, max 3)</Label>
            <FileUpload
              documents={formData.documents}
              onChange={handleDocumentsChange}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit">
              {taskId ? 'Update Task' : 'Create Task'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}