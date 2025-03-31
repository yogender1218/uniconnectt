
import React from "react";
import { cn } from "@/lib/utils";

const NavItem = ({
  icon, label, active, count, onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className={cn(
          "shrink-0 rounded-full px-1.5 py-0.5 text-xs",
          active 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          {count}
        </span>
      )}
    </button>
  );
};

export default NavItem;
