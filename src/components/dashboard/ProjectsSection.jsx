
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SlideIn } from "@/components/Animations";
import ProjectCard from "@/components/dashboard/ProjectCard";
import CreateProjectDialog from "@/components/dashboard/CreateProjectDialog";
import ProjectDetailsDialog from "@/components/dashboard/ProjectDetailsDialog";

const ProjectsSection = ({
  userProjects,
  handleCreateProject,
  selectedProject,
  isProjectDetailsOpen,
  setIsProjectDetailsOpen,
  handleViewProject
}) => {
  return (
    <SlideIn>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Track your ongoing and completed projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              description={project.description}
              progress={project.progress}
              collaborators={project.collaborators}
              dueDate={project.dueDate}
              onView={() => handleViewProject(project)}
            />
          ))}
        </CardContent>
        <CardFooter>
          <CreateProjectDialog 
            onCreateProject={handleCreateProject}
            trigger={<Button className="w-full">Create New Project</Button>}
          />
        </CardFooter>
      </Card>

      {selectedProject && (
        <ProjectDetailsDialog
          open={isProjectDetailsOpen}
          onOpenChange={setIsProjectDetailsOpen}
          project={selectedProject}
        />
      )}
    </SlideIn>
  );
};

export default ProjectsSection;
