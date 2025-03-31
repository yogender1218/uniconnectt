
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { SlideIn } from "@/components/Animations";
import ResourceCard from "@/components/dashboard/ResourceCard";
import { toast } from "sonner";

interface ResourcesSectionProps {
  isResourcesOpen: boolean;
  setIsResourcesOpen: (open: boolean) => void;
  handleViewAllResources: () => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  isResourcesOpen,
  setIsResourcesOpen,
  handleViewAllResources
}) => {
  return (
    <SlideIn>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
          <CardDescription>Curated materials to enhance your knowledge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResourceCard 
            title="Machine Learning Fundamentals"
            type="Course"
            author="Dr. Maria Johnson"
            rating={4.8}
            onClick={() => toast.success("Opening Machine Learning Fundamentals course")}
          />
          <ResourceCard 
            title="The Future of AI in Education"
            type="Research Paper"
            author="Prof. David Chen"
            rating={4.5}
            onClick={() => toast.success("Opening The Future of AI in Education paper")}
          />
          <ResourceCard 
            title="Data Science for Beginners"
            type="E-Book"
            author="Alex Williams"
            rating={4.7}
            onClick={() => toast.success("Opening Data Science for Beginners e-book")}
          />
          <ResourceCard 
            title="Advanced Neural Networks"
            type="Video Series"
            author="Tech Learning Hub"
            rating={4.9}
            onClick={() => toast.success("Opening Advanced Neural Networks video series")}
          />
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleViewAllResources}
          >
            Browse All Resources
          </Button>
        </CardFooter>
      </Card>

      <Sheet open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto" side="right">
          <SheetHeader className="mb-5">
            <SheetTitle>All Learning Resources</SheetTitle>
            <SheetDescription>
              Browse our collection of educational content
            </SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex gap-2 items-center">
              <Button variant="outline" size="sm" className="w-full">All</Button>
              <Button variant="ghost" size="sm" className="w-full">Courses</Button>
              <Button variant="ghost" size="sm" className="w-full">Papers</Button>
              <Button variant="ghost" size="sm" className="w-full">Books</Button>
            </div>
            <div className="my-2">
              <h3 className="text-sm font-medium mb-2">Recommended for You</h3>
            </div>
            <ResourceCard 
              title="Machine Learning Fundamentals"
              type="Course"
              author="Dr. Maria Johnson"
              rating={4.8}
              onClick={() => toast.success("Opening Machine Learning Fundamentals course")}
            />
            <ResourceCard 
              title="The Future of AI in Education"
              type="Research Paper"
              author="Prof. David Chen"
              rating={4.5}
              onClick={() => toast.success("Opening The Future of AI in Education paper")}
            />
            <ResourceCard 
              title="Data Science for Beginners"
              type="E-Book"
              author="Alex Williams"
              rating={4.7}
              onClick={() => toast.success("Opening Data Science for Beginners e-book")}
            />
            <ResourceCard 
              title="Advanced Neural Networks"
              type="Video Series"
              author="Tech Learning Hub"
              rating={4.9}
              onClick={() => toast.success("Opening Advanced Neural Networks video series")}
            />
            <Separator className="my-2" />
            <div className="my-2">
              <h3 className="text-sm font-medium mb-2">Popular This Week</h3>
            </div>
            <ResourceCard 
              title="Deep Learning Specialization"
              type="Course"
              author="Prof. Andrew Evans"
              rating={5.0}
              onClick={() => toast.success("Opening Deep Learning Specialization course")}
            />
            <ResourceCard 
              title="Blockchain in Education"
              type="Research Paper"
              author="Dr. Lisa Kumar"
              rating={4.6}
              onClick={() => toast.success("Opening Blockchain in Education paper")}
            />
            <ResourceCard 
              title="Python for Data Scientists"
              type="E-Book"
              author="Michael Roberts"
              rating={4.9}
              onClick={() => toast.success("Opening Python for Data Scientists e-book")}
            />
            <ResourceCard 
              title="Quantum Computing Basics"
              type="Video Series"
              author="Quantum Academy"
              rating={4.7}
              onClick={() => toast.success("Opening Quantum Computing Basics video series")}
            />
          </div>
        </SheetContent>
      </Sheet>
    </SlideIn>
  );
};

export default ResourcesSection;
