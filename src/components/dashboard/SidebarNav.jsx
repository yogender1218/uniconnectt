
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/Animations";
import NavItem from "@/components/dashboard/NavItem";
import { Home, Bell, BarChart2, Briefcase, Lightbulb, HelpCircle } from "lucide-react";

const SidebarNav = ({
  userName = "User",
  userType = "user",
  activeSection,
  setActiveSection,
  typeIcon
}) => {
  return (
    <FadeIn className="hidden md:block">
      <div className="glass-card p-4 rounded-xl space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            {typeIcon}
          </div>
          <h3 className="font-medium">{userName || "User"}</h3>
          <Badge className="mt-1 capitalize">{userType || "user"}</Badge>
        </div>
        
        <Separator />
        
        <nav className="space-y-1">
          <NavItem 
            icon={<Home size={18} />} 
            label="Home" 
            active={activeSection === "home"}
            onClick={() => setActiveSection("home")}
          />
          <NavItem 
            icon={<Bell size={18} />} 
            label="Notifications" 
            count={3}
            active={activeSection === "notifications"} 
            onClick={() => setActiveSection("notifications")}
          />
          <NavItem 
            icon={<BarChart2 size={18} />} 
            label="Analytics"
            active={activeSection === "analytics"} 
            onClick={() => setActiveSection("analytics")}
          />
          <NavItem 
            icon={<Briefcase size={18} />} 
            label="Projects"
            active={activeSection === "projects"} 
            onClick={() => setActiveSection("projects")}
          />
          <NavItem 
            icon={<Lightbulb size={18} />} 
            label="Resources"
            active={activeSection === "resources"} 
            onClick={() => setActiveSection("resources")}
          />
          <NavItem 
            icon={<HelpCircle size={18} />} 
            label="Help"
            active={activeSection === "help"} 
            onClick={() => setActiveSection("help")}
          />
        </nav>
      </div>
    </FadeIn>
  );
};

export default SidebarNav;
