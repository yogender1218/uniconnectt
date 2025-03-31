
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, FileText, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
}

interface ProjectDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    title: string;
    description: string;
    progress: number;
    collaborators: number;
    dueDate: string;
    tasks?: ProjectTask[];
  };
}

const ProjectDetailsDialog: React.FC<ProjectDetailsProps> = ({ 
  open, 
  onOpenChange, 
  project 
}) => {
  const defaultTasks: ProjectTask[] = [
    { id: '1', title: 'Research & planning', completed: true },
    { id: '2', title: 'Initial design & prototyping', completed: true },
    { id: '3', title: 'Implementation phase', completed: project.progress > 50 },
    { id: '4', title: 'Testing & quality assurance', completed: project.progress > 75 },
    { id: '5', title: 'Final review & deployment', completed: project.progress > 90 }
  ];
  
  const tasks = project.tasks || defaultTasks;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>
            Project details and progress tracking
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-muted-foreground" />
              <span className="text-sm">Due: {project.dueDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-muted-foreground" />
              <span className="text-sm">{project.collaborators} Collaborators</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-muted-foreground" />
              <span className="text-sm">{tasks.length} Tasks</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${project.progress}%` }} 
              />
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-3">Project Tasks</h4>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${task.completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {task.completed ? <CheckCircle size={12} /> : null}
                  </div>
                  <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </span>
                  {task.completed && (
                    <Badge variant="outline" className="ml-auto text-xs">
                      Completed
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            Edit Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
