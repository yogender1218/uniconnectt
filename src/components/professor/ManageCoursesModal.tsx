
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/services/api";
import { Edit, Users, FileText, Plus } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ManageCoursesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: Course[];
}

const ManageCoursesModal: React.FC<ManageCoursesModalProps> = ({
  open,
  onOpenChange,
  courses,
}) => {
  const [managedCourses, setManagedCourses] = useState<Course[]>(courses);
  
  const totalStudents = managedCourses.reduce((sum, course) => sum + course.students, 0);
  const avgProgress = Math.round(
    managedCourses.reduce((sum, course) => sum + course.progress, 0) / 
    managedCourses.length
  );
  
  const handleUpdateCourse = async (courseId: string, data: Partial<Course>) => {
    try {
      const updatedCourse = await api.updateCourse(courseId, data);
      setManagedCourses(prev => 
        prev.map(course => course.id === courseId ? updatedCourse : course)
      );
      toast.success("Course updated successfully");
    } catch (error) {
      toast.error("Failed to update course");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle>Manage Your Courses</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FileText size={20} />
                </div>
                <p className="text-3xl font-bold">{managedCourses.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users size={20} />
                </div>
                <p className="text-3xl font-bold">{totalStudents}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={avgProgress} className="w-full" />
                <p className="text-lg font-semibold">{avgProgress}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mb-4">
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            <span>Add New Course</span>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managedCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">
                  <div>
                    {course.title}
                    <Badge variant="outline" className="ml-2">
                      {course.lessons} lessons
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{course.students}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full space-y-1">
                    <Progress value={course.progress} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      {course.progress}% avg. completion
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Edit size={14} />
                    <span>Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCoursesModal;
