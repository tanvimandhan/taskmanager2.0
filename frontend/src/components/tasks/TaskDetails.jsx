import { useTasks } from '@/contexts/TaskContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Download } from 'lucide-react';



export function TaskDetails({ taskId, onClose }) {
  const { tasks } = useTasks();
  const task = tasks.find(t => t.id === taskId);

  if (!task) return null;

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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = (doc) => {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    link.click();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {task.title}
            <div className="flex gap-2">
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
              <Badge className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-muted-foreground">{task.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Assigned To</h4>
              <p className="text-muted-foreground">{task.assignedToName}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Due Date</h4>
              <p className="text-muted-foreground">
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Created</h4>
              <p className="text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Priority</h4>
              <p className="text-muted-foreground capitalize">{task.priority}</p>
            </div>
          </div>
          
          {task.documents.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Attached Documents</h4>
              <div className="space-y-2">
                {task.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(doc.size)} • PDF
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}