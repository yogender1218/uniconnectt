
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "@/services/api";

interface UserProfileModalProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  open,
  onOpenChange,
}) => {
  // If user is null or undefined, render a placeholder or return null
  if (!user) {
    if (!open) return null;
    
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-muted-foreground">User information not available</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const userName = user.name || "User";
  const userType = user.type || "user";
  const userProfile = user.profile || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="relative h-32 rounded-t-lg bg-gradient-to-r from-primary/30 to-primary/10 mb-16">
            <div className="absolute -bottom-12 left-4">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarFallback className="text-2xl">
                  {userName.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <div className="px-4 pt-14">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{userName}</h3>
                <p className="text-sm text-muted-foreground">
                  {userType === "student" 
                    ? "Student" 
                    : userType === "professor" 
                      ? "Professor" 
                      : "Investor"}
                </p>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            
            <Separator className="my-4" />
            
            {userType === "student" && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">University</h4>
                  <p className="text-sm text-muted-foreground">{userProfile.university || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Degree</h4>
                  <p className="text-sm text-muted-foreground">{userProfile.degree || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Graduation Year</h4>
                  <p className="text-sm text-muted-foreground">{userProfile.graduation_year || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {userProfile.skills ? 
                      userProfile.skills.split(',').map((skill: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill.trim()}
                        </Badge>
                      )) 
                      : "Not specified"}
                  </div>
                </div>
              </div>
            )}
            
            {userType === "professor" && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">Company/University</h4>
                  <p className="text-sm text-muted-foreground">{userProfile.company || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Industry</h4>
                  <p className="text-sm text-muted-foreground">{userProfile.industry || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Expertise Areas</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {userProfile.expertise_areas ? 
                      userProfile.expertise_areas.split(',').map((area: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {area.trim()}
                        </Badge>
                      )) 
                      : "Not specified"}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Available for Mentorship</h4>
                  <p className="text-sm text-muted-foreground">
                    {userProfile.open_for_mentorship ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            )}
            
            {userType === "investor" && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">Investment Firm</h4>
                  <p className="text-sm text-muted-foreground">{userProfile.investment_firm || "Independent"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Investment Categories</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {userProfile.investment_categories ? 
                      userProfile.investment_categories.split(',').map((category: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {category.trim()}
                        </Badge>
                      )) 
                      : "Not specified"}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-sm font-medium">Min Investment</h4>
                    <p className="text-sm text-muted-foreground">
                      ${userProfile.min_investment?.toLocaleString() || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Max Investment</h4>
                    <p className="text-sm text-muted-foreground">
                      ${userProfile.max_investment?.toLocaleString() || "Not specified"}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Stage of Interest</h4>
                  <p className="text-sm text-muted-foreground">{userProfile.stage_of_interest || "Not specified"}</p>
                </div>
              </div>
            )}
            
            <Separator className="my-4" />
            
            <div className="flex space-x-4 mb-4">
              {userProfile.linkedin && (
                <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                  LinkedIn Profile
                </a>
              )}
              {userProfile.portfolio && (
                <a href={userProfile.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
