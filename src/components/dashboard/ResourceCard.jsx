
import React from "react";
import { BookOpen, FileText, BookMarked, PlayCircle, Star } from "lucide-react";

const ResourceCard = ({ 
  title, type, author, rating, onClick 
}) => {
  return (
    <div 
      className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center shrink-0">
        {type === "Course" && <BookOpen size={18} />}
        {type === "Research Paper" && <FileText size={18} />}
        {type === "E-Book" && <BookMarked size={18} />}
        {type === "Video Series" && <PlayCircle size={18} />}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground">{type} • {author}</p>
          <div className="flex items-center">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-xs ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
