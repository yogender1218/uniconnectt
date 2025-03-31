
import React from "react";
import { cn } from "@/lib/utils";

export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.3,
  className
}) => {
  return (
    <div 
      className={cn("animate-fade-in", className)}
      style={{ 
        animationDelay: `${delay}s`, 
        animationDuration: `${duration}s`,
        opacity: 0,
        animationFillMode: "forwards"
      }}
    >
      {children}
    </div>
  );
};

export const SlideIn = ({ 
  children, 
  delay = 0, 
  duration = 0.4,
  className,
  direction = "up"
}) => {
  const getInitialTransform = () => {
    switch (direction) {
      case "up": return "translateY(20px)";
      case "down": return "translateY(-20px)";
      case "left": return "translateX(20px)";
      case "right": return "translateX(-20px)";
      default: return "translateY(20px)";
    }
  };

  return (
    <div 
      className={cn("animate-slide-in", className)}
      style={{ 
        animationDelay: `${delay}s`, 
        animationDuration: `${duration}s`,
        opacity: 0,
        transform: getInitialTransform(),
        animationFillMode: "forwards"
      }}
    >
      {children}
    </div>
  );
};

export const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 0.3,
  className
}) => {
  return (
    <div 
      className={cn("animate-scale-in", className)}
      style={{ 
        animationDelay: `${delay}s`, 
        animationDuration: `${duration}s`,
        opacity: 0,
        animationFillMode: "forwards"
      }}
    >
      {children}
    </div>
  );
};

export const StaggeredContainer = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  animation = "fade",
  className
}) => {
  const AnimationComponent = 
    animation === "slide" ? SlideIn :
    animation === "scale" ? ScaleIn :
    FadeIn;
  
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return (
          <AnimationComponent delay={initialDelay + (index * staggerDelay)}>
            {child}
          </AnimationComponent>
        );
      })}
    </div>
  );
};
