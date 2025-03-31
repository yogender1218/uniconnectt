import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const mockUser = {
        id: "user-123",
        name: email.split("@")[0],
        email,
        token: "mock-token-" + Math.random().toString(36).substring(2),
        type: null,
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
  };

  const selectUserType = (type) => {
    if (!user) return;
    let profile = { type };

    switch (type) {
      case "student":
        profile = { type, university: "", degree: "", graduation_year: "", skills: "", bio: "", linkedin: "", portfolio: "" };
        break;
      case "professor":
        profile = { type, university: "", department: "", specialization: "", publications: 0, bio: "", linkedin: "", portfolio: "" };
        break;
      case "investor":
        profile = { type, company: "", position: "", investment_focus: "", portfolio_size: "", bio: "", linkedin: "", portfolio: "" };
        break;
    }

    let avatarUrl = "/placeholder.svg";
    let coverUrl = "/placeholder.svg";

    const updatedUser = { ...user, type, profile, avatarUrl, coverUrl };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success(`You're now using the dashboard as a ${type}`);
  };

  const updateProfile = (profileData) => {
    if (!user || !user.type || !user.profile) return;
    const updatedUser = { ...user, profile: { ...user.profile, ...profileData } };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully");
  };

  const updateProfileImage = (type, url) => {
    if (!user) return;
    const updatedUser = { ...user };
    if (type === "avatar") {
      updatedUser.avatarUrl = url;
    } else {
      updatedUser.coverUrl = url;
    }
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success(`${type === "avatar" ? "Profile" : "Cover"} image updated successfully`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        selectUserType,
        updateProfile,
        updateProfileImage,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};