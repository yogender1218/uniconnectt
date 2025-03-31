
import React from "react";
import UserProfileModal from "@/components/UserProfileModal";
import CoursesModal from "@/components/student/CoursesModal";
import ManageCoursesModal from "@/components/professor/ManageCoursesModal";
import PortfolioModal from "@/components/investor/PortfolioModal";

const DashboardModals = ({
  selectedPerson,
  isUserProfileOpen,
  setIsUserProfileOpen,
  isCoursesOpen,
  setIsCoursesOpen,
  courses,
  isManageCoursesOpen,
  setIsManageCoursesOpen,
  professorCourses,
  isPortfolioOpen,
  setIsPortfolioOpen,
  portfolioItems
}) => {
  return (
    <>
      <UserProfileModal
        user={selectedPerson}
        open={isUserProfileOpen}
        onOpenChange={setIsUserProfileOpen}
      />

      <CoursesModal 
        open={isCoursesOpen} 
        onOpenChange={setIsCoursesOpen}
        courses={courses}
      />

      <ManageCoursesModal 
        open={isManageCoursesOpen} 
        onOpenChange={setIsManageCoursesOpen}
        courses={professorCourses}
      />

      <PortfolioModal 
        open={isPortfolioOpen} 
        onOpenChange={setIsPortfolioOpen}
        portfolioItems={portfolioItems}
      />
    </>
  );
};

export default DashboardModals;
