
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import { StaggeredContainer } from "./Animations";

const UserTypeSelector = ({ className, onSelect }) => {
  const { selectUserType } = useAuth();

  const handleSelect = (type) => {
    selectUserType(type);
    if (onSelect) onSelect();
  };

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose your perspective</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Select how you want to use the dashboard. You can change this anytime.
      </p>
      
      <StaggeredContainer 
        animation="slide" 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        initialDelay={0.1}
        staggerDelay={0.15}
      >
        <UserTypeCard
          icon={<GraduationCap size={32} />}
          title="Student"
          description="Access educational resources, track your progress, and connect with peers and professors."
          onClick={() => handleSelect("student")}
        />
        
        <UserTypeCard
          icon={<BookOpen size={32} />}
          title="Professor"
          description="Manage courses, publish research, and engage with students and colleagues."
          onClick={() => handleSelect("professor")}
        />
        
        <UserTypeCard
          icon={<TrendingUp size={32} />}
          title="Investor"
          description="Discover promising projects, track investments, and connect with educators and researchers."
          onClick={() => handleSelect("investor")}
        />
      </StaggeredContainer>
    </div>
  );
};

const UserTypeCard = ({ 
  icon, 
  title, 
  description, 
  onClick 
}) => {
  return (
    <motion.div
      className="glass-card rounded-xl p-6 cursor-pointer hover-scale hover-glow"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-primary/10 mb-4 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default UserTypeSelector;
