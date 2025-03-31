
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const ActivityCard = ({
  person,
  activity = "",
  target = "",
  time = "",
  onView
}) => {
  // Handle null or undefined person
  if (!person) {
    return null;
  }
  
  const personName = person.name || "Unknown";
  const initial = personName.charAt(0) || "?";
  
  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          {person.avatar && <AvatarImage src={person.avatar} alt={personName} />}
          <AvatarFallback className="bg-primary/10 text-primary">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p>
            <span className="font-medium">{personName}</span>{' '}
            <span className="text-muted-foreground">{activity}</span>{' '}
            <span className="font-medium">{target}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">{time}</p>
        </div>
        <Button size="sm" variant="outline" onClick={onView}>
          <Eye size={14} className="mr-1" />
          View
        </Button>
      </div>
    </div>
  );
};

export default ActivityCard;
