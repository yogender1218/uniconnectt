
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const AnalyticCard = ({ title, value, change }) => {
  const isPositive = change.startsWith("+");
  
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="flex items-end justify-between mt-1">
        <p className="text-2xl font-bold">{value}</p>
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs",
            isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          {change}
        </Badge>
      </div>
    </div>
  );
};

export default AnalyticCard;
