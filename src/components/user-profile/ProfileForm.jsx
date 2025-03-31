
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import StudentProfileForm from "./forms/StudentProfileForm";
import ProfessorProfileForm from "./forms/ProfessorProfileForm";
import InvestorProfileForm from "./forms/InvestorProfileForm";

const ProfileForm = () => {
  const { user } = useAuth();
  
  if (!user || !user.type) {
    return <div>Please select a user type first</div>;
  }
  
  // Render appropriate form based on user type
  switch (user.type) {
    case "student":
      return <StudentProfileForm />;
    case "professor":
      return <ProfessorProfileForm />;
    case "investor":
      return <InvestorProfileForm />;
    default:
      return <div>Unknown user type</div>;
  }
};

export default ProfileForm;
