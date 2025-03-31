
import React from "react";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";
import { FadeIn } from "./Animations";

const Layout = ({ 
  children, 
  className,
  withAnimation = true
}) => {
  const content = (
    <div className={cn("min-h-screen pt-20", className)}>
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {children}
      </main>
      <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} UniConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );

  return withAnimation ? <FadeIn>{content}</FadeIn> : content;
};

export default Layout;
