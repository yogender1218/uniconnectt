
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectCard = ({ 
  title, description, progress, collaborators, dueDate, onView
}) => {
  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{title}</h3>
        <Badge variant="outline">{dueDate}</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {Array.from({ length: Math.min(collaborators, 3) }).map((_, i) => (
              <div 
                key={i}
                className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
              >
                {i + 1}
              </div>
            ))}
            {collaborators > 3 && (
              <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium text-primary">
                +{collaborators - 3}
              </div>
            )}
          </div>
          
          <Button variant="ghost" size="sm" onClick={onView}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
