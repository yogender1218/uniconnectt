
import React from "react";
import { Badge } from "@/components/ui/badge";

const DiscoverCard = ({ 
  title, author, type, image, tags 
}) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {image && (
        <div className="h-40 bg-muted/50 relative overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-medium line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {author} • {type}
        </p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverCard;
