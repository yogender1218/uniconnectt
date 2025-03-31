
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Menu, X, User, Bell, Search, LogOut, 
  ChevronDown, Sun, Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FadeIn } from "./Animations";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  // Handle profile click to navigate to profile page
  const handleProfileClick = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled 
          ? "bg-white/70 dark:bg-gray-900/70 shadow-md py-3"
          : "bg-white/30 dark:bg-gray-900/30 py-5",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary transition-all duration-300 hover:opacity-80"
          >
            UniConnect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            )}
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleDarkMode}
                className="hover:bg-secondary"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 h-10 px-4 text-sm font-medium transition-colors"
                    >
                      <User size={18} />
                      <span>{user?.name}</span>
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={handleProfileClick}
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Bell size={16} />
                      <span>Notifications</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="flex items-center gap-2 text-destructive"
                      onClick={logout}
                    >
                      <LogOut size={16} />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    className="h-10 px-4 text-sm font-medium transition-colors"
                    asChild
                  >
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button 
                    className="h-10 px-4 text-sm font-medium"
                    asChild
                  >
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <FadeIn className="md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            {isAuthenticated && (
              <Link 
                to="/profile" 
                className="py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
            
            <div className="flex justify-between items-center pt-4 border-t border-border">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleDarkMode}
                className="hover:bg-secondary"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              
              {isAuthenticated ? (
                <Button 
                  variant="destructive" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  <span>Log out</span>
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    className="h-10 px-4 text-sm font-medium transition-colors"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button 
                    className="h-10 px-4 text-sm font-medium"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      )}
    </nav>
  );
};

export default Navbar;
