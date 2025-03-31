
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PersonCard = ({
  id,
  name = "Unknown",
  role = "",
  type = "",
  avatar,
  mutualConnections,
  isConnected = false,
  onClick,
  onConnect
}) => {
  // Handle null or undefined values
  const displayName = name || "Unknown";
  const initial = displayName.charAt(0) || "?";
  
  return (
    <div className="border border-border rounded-lg p-4 flex flex-col items-center text-center">
      <Avatar className="w-16 h-16 mb-3" onClick={onClick} style={{ cursor: 'pointer' }}>
        {avatar && <AvatarImage src={avatar} alt={displayName} />}
        <AvatarFallback className="bg-primary/10 text-primary text-xl">
          {initial}
        </AvatarFallback>
      </Avatar>
      <h3 className="font-medium cursor-pointer" onClick={onClick}>{displayName}</h3>
      <p className="text-sm text-muted-foreground mb-2">{role}</p>
      <Badge variant="outline" className="mb-3 capitalize">{type}</Badge>
      
      {mutualConnections && mutualConnections > 0 && (
        <p className="text-xs text-muted-foreground mb-3">
          {mutualConnections} mutual connection{mutualConnections > 1 ? 's' : ''}
        </p>
      )}
      
      <Button 
        size="sm" 
        variant={isConnected ? "default" : "outline"} 
        className="w-full flex items-center gap-1"
        onClick={onConnect}
        disabled={isConnected}
      >
        {isConnected ? (
          <>
            <UserCheck size={14} />
            <span>Connected</span>
          </>
        ) : (
          <>
            <UserPlus size={14} />
            <span>Connect</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default PersonCard;
