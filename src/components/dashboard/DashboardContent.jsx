
import React from "react";
import { SlideIn } from "@/components/Animations";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import NotificationsSection from "@/components/dashboard/NotificationsSection";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import ProjectsSection from "@/components/dashboard/ProjectsSection";
import ResourcesSection from "@/components/dashboard/ResourcesSection";
import HelpSection from "@/components/dashboard/HelpSection";
import { Home, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

const DashboardContent = ({
  user,
  activeSection,
  postsData,
  dashboardState,
  analyticsData
}) => {
  const {
    isAllNotificationsOpen,
    setIsAllNotificationsOpen,
    isResourcesOpen,
    setIsResourcesOpen,
    selectedProject,
    isProjectDetailsOpen,
    setIsProjectDetailsOpen,
    isHelpOpen,
    setIsHelpOpen,
    connectedPeople,
    userProjects,
    
    // Handlers
    handleViewAllNotifications,
    handleViewAllResources,
    handleContactSupport,
    handleViewProject,
    handleCreateProject,
    handleViewPersonProfile,
    handleConnectWithPerson
  } = dashboardState;

  const { loading, error, posts, likePost, commentOnPost, replyToComment, createPost } = postsData;

  const getTypeIcon = () => {
    switch (user?.type) {
      case "student":
        return <GraduationCap size={20} />;
      case "professor":
        return <BookOpen size={20} />;
      case "investor":
        return <TrendingUp size={20} />;
      default:
        return <Home size={20} />;
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <DashboardTabs 
            activeSection={activeSection}
            loading={loading}
            error={error}
            posts={posts}
            likePost={likePost}
            commentOnPost={commentOnPost}
            replyToComment={replyToComment}
            createPost={createPost}
            connectedPeople={connectedPeople}
            handleConnectWithPerson={handleConnectWithPerson}
            handleViewPersonProfile={handleViewPersonProfile}
          />
        );
        
      case "notifications":
        return (
          <NotificationsSection 
            isAllNotificationsOpen={isAllNotificationsOpen}
            setIsAllNotificationsOpen={setIsAllNotificationsOpen}
            handleViewAllNotifications={handleViewAllNotifications}
          />
        );
        
      case "analytics":
        return (
          <AnalyticsSection analyticsData={analyticsData} />
        );
        
      case "projects":
        return (
          <ProjectsSection 
            userProjects={userProjects}
            handleCreateProject={handleCreateProject}
            selectedProject={selectedProject}
            isProjectDetailsOpen={isProjectDetailsOpen}
            setIsProjectDetailsOpen={setIsProjectDetailsOpen}
            handleViewProject={handleViewProject}
          />
        );
        
      case "resources":
        return (
          <ResourcesSection 
            isResourcesOpen={isResourcesOpen}
            setIsResourcesOpen={setIsResourcesOpen}
            handleViewAllResources={handleViewAllResources}
          />
        );
        
      case "help":
        return (
          <HelpSection 
            isHelpOpen={isHelpOpen}
            setIsHelpOpen={setIsHelpOpen}
            handleContactSupport={handleContactSupport}
          />
        );
      
      default:
        return (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">Select a section</h3>
            <p className="text-muted-foreground">
              Choose a section from the sidebar to view its content.
            </p>
          </div>
        );
    }
  };

  return (
    <SlideIn>
      <div className="glass-card p-5 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {getTypeIcon()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              Welcome, {user?.name || "User"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Your {user?.type || "dashboard"}
            </p>
          </div>
        </div>
        
        {renderActiveSection()}
      </div>
    </SlideIn>
  );
};

export default DashboardContent;
