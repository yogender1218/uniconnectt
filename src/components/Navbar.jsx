
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, LogOut, User, Settings, Sun, Moon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Check if document exists before adding event listener
    if (typeof document !== "undefined") {
      // Check if dark mode is enabled
      if (document.documentElement.classList.contains("dark")) {
        setIsDarkMode(true);
      }
    }

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

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const profileItems = [
    {
      label: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
      onClick: () => navigate("/profile"),
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      onClick: () => navigate("/settings"),
    },
    {
      label: "Logout",
      icon: <LogOut className="mr-2 h-4 w-4" />,
      onClick: handleLogout,
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled 
          ? "bg-white/70 dark:bg-gray-900/70 shadow-md py-3"
          : "bg-white/30 dark:bg-gray-900/30 py-5"
      }`}
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
                      <span>{user?.name || user?.username || "User"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem 
                      className="flex items-center gap-2"
                      onClick={() => navigate("/profile")}
                    >
                      <User size={16} />
                      <span>Profile</span>
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
        <div className="md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-lg">
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
