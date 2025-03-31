
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { GraduationCap, Briefcase, DollarSign, Mail, Link, Linkedin } from "lucide-react";

const ProfileHeader = () => {
  const { user, updateProfileImage } = useAuth();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  if (!user) return null;

  const handleUpdateImage = (type: 'avatar' | 'cover') => {
    const url = type === 'avatar' ? avatarUrl : coverUrl;
    
    if (!url) {
      toast.error(`Please enter a valid ${type} URL`);
      return;
    }
    
    updateProfileImage(type, url);
    
    if (type === 'avatar') {
      setIsEditingAvatar(false);
      setAvatarUrl('');
    } else {
      setIsEditingCover(false);
      setCoverUrl('');
    }
  };

  // Helper to determine what primary info to show
  const getPrimaryInfo = () => {
    if (!user.profile) return null;
    
    switch (user.type) {
      case 'student':
        if ('university' in user.profile && user.profile.university) {
          return (
            <div className="flex items-center gap-2 text-md">
              <GraduationCap size={16} />
              <span>{user.profile.university}</span>
            </div>
          );
        }
        break;
      case 'professor':
        if ('university' in user.profile && user.profile.university) {
          return (
            <div className="flex items-center gap-2 text-md">
              <Briefcase size={16} />
              <span>{user.profile.university}</span>
            </div>
          );
        }
        break;
      case 'investor':
        if ('company' in user.profile && user.profile.company) {
          return (
            <div className="flex items-center gap-2 text-md">
              <DollarSign size={16} />
              <span>{user.profile.company}</span>
            </div>
          );
        }
        break;
    }
    
    return null;
  };

  return (
    <div className="w-full">
      {/* Cover Photo */}
      <div className="relative rounded-t-xl h-40 md:h-60 overflow-hidden bg-gray-200">
        <img 
          src={user.coverUrl || "/placeholder.svg"} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <Button 
          variant="secondary" 
          size="sm" 
          className="absolute bottom-4 right-4"
          onClick={() => setIsEditingCover(!isEditingCover)}
        >
          {isEditingCover ? "Cancel" : "Change Cover"}
        </Button>
        
        {isEditingCover && (
          <div className="absolute bottom-4 left-4 right-20 flex gap-2">
            <Input
              type="text"
              placeholder="Enter image URL"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="bg-white/90"
            />
            <Button onClick={() => handleUpdateImage('cover')}>Update</Button>
          </div>
        )}
      </div>
      
      {/* Profile Info & Avatar */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative -mt-16 md:-mt-20">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-md">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute bottom-0 right-0"
                onClick={() => setIsEditingAvatar(!isEditingAvatar)}
              >
                {isEditingAvatar ? "Cancel" : "Change"}
              </Button>
              
              {isEditingAvatar && (
                <div className="absolute top-full left-0 right-0 mt-2 flex gap-2 z-10 bg-background p-2 rounded-md shadow-md">
                  <Input
                    type="text"
                    placeholder="Enter image URL"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="text-xs"
                  />
                  <Button size="sm" onClick={() => handleUpdateImage('avatar')}>Update</Button>
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="space-y-2 flex-1 pt-2">
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              
              {getPrimaryInfo()}
              
              <div className="flex items-center gap-2 text-md">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              
              {/* LinkedIn and Portfolio links if available */}
              {user.profile && (
                <div className="flex flex-wrap gap-4 mt-3">
                  {user.profile.type === 'student' && (
                    <>
                      {'degree' in user.profile && user.profile.degree && (
                        <div className="flex items-center gap-2 text-sm">
                          <GraduationCap size={14} />
                          <span>Degree: {user.profile.degree}</span>
                        </div>
                      )}
                      {'graduation_year' in user.profile && user.profile.graduation_year && (
                        <div className="flex items-center gap-2 text-sm">
                          <GraduationCap size={14} />
                          <span>Class of {user.profile.graduation_year}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  {user.profile.type === 'professor' && (
                    <>
                      {'department' in user.profile && user.profile.department && (
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase size={14} />
                          <span>Department: {user.profile.department}</span>
                        </div>
                      )}
                      {'publications' in user.profile && user.profile.publications !== undefined && (
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase size={14} />
                          <span>Publications: {user.profile.publications}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  {user.profile.type === 'investor' && (
                    <>
                      {'position' in user.profile && user.profile.position && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign size={14} />
                          <span>Position: {user.profile.position}</span>
                        </div>
                      )}
                      {'investment_focus' in user.profile && user.profile.investment_focus && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign size={14} />
                          <span>Focus: {user.profile.investment_focus}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              
              {/* Social Links */}
              <div className="flex gap-3 mt-4">
                {user.profile && 'linkedin' in user.profile && user.profile.linkedin && (
                  <a 
                    href={user.profile.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                )}
                
                {user.profile && 'portfolio' in user.profile && user.profile.portfolio && (
                  <a 
                    href={user.profile.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Link size={16} />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileHeader;
