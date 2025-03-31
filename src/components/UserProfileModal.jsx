
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, Linkedin } from "lucide-react";

const UserProfileModal = ({ open, onOpenChange, user, onConnect }) => {
  if (!user) return null;

  const name = user.name || "Unknown User";
  const initial = name.charAt(0) || "?";
  const role = user.role || "";
  const type = user.type || "";
  const isConnected = user.isConnected || false;
  const avatar = user.avatar || "";
  
  // Safely get profile data
  const profile = user.profile || {};

  const renderProfileInfo = () => {
    switch (type) {
      case "student":
        return renderStudentProfile();
      case "professor":
        return renderProfessorProfile();
      case "investor":
        return renderInvestorProfile();
      default:
        return <p>No profile information available</p>;
    }
  };

  const renderStudentProfile = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">University</h3>
            <p>{profile.university || "Not specified"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Degree</h3>
            <p>{profile.degree || "Not specified"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Graduation Year</h3>
            <p>{profile.graduation_year || "Not specified"}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills ? profile.skills.split(',').map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill.trim()}
              </Badge>
            )) : <p>No skills specified</p>}
          </div>
        </div>
      </div>
    );
  };

  const renderProfessorProfile = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Company/Institution</h3>
            <p>{profile.company || "Not specified"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
            <p>{profile.industry || "Not specified"}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {profile.expertise_areas ? profile.expertise_areas.split(',').map((area, index) => (
              <Badge key={index} variant="outline">
                {area.trim()}
              </Badge>
            )) : <p>No expertise areas specified</p>}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Open for Mentorship</h3>
          <p>{profile.open_for_mentorship ? "Yes" : "No"}</p>
        </div>
      </div>
    );
  };

  const renderInvestorProfile = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Investment Firm</h3>
            <p>{profile.investment_firm || "Not specified"}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Investment Categories</h3>
          <div className="flex flex-wrap gap-2">
            {profile.investment_categories ? profile.investment_categories.split(',').map((category, index) => (
              <Badge key={index} variant="outline">
                {category.trim()}
              </Badge>
            )) : <p>No investment categories specified</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Minimum Investment</h3>
            <p>
              {profile.min_investment 
                ? `$${parseInt(profile.min_investment).toLocaleString()}`
                : "Not specified"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Maximum Investment</h3>
            <p>
              {profile.max_investment 
                ? `$${parseInt(profile.max_investment).toLocaleString()}`
                : "Not specified"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Stage of Interest</h3>
            <p>{profile.stage_of_interest || "Not specified"}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderExternalLinks = () => {
    return (
      <div className="mt-6 space-y-3 border-t border-border pt-4">
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-500 hover:underline">
            <Linkedin size={16} />
            <span>LinkedIn Profile</span>
          </a>
        )}
        
        {profile.portfolio && (
          <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-500 hover:underline">
            <Link size={16} />
            <span>Portfolio Website</span>
          </a>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="h-20 w-20 mb-4">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {initial}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-muted-foreground">{role}</p>
          <Badge className="mt-2 capitalize">{type}</Badge>
          
          <Button 
            className="mt-4 w-full"
            variant={isConnected ? "secondary" : "default"}
            onClick={onConnect}
            disabled={isConnected}
          >
            {isConnected ? "Connected" : "Connect"}
          </Button>
        </div>
        
        <div className="space-y-4">
          {renderProfileInfo()}
          {renderExternalLinks()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
