
import React from "react";
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
import { Play, Book, Users, Clock } from "lucide-react";

const CoursesModal = ({
  open,
  onOpenChange,
  courses,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Courses</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Book size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-xl font-semibold">{courses?.length || 0}</p>
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Instructors</p>
              <p className="text-xl font-semibold">
                {Array.from(new Set(courses?.map(c => c.instructor) || [])).length}
              </p>
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hours of Content</p>
              <p className="text-xl font-semibold">
                {courses?.reduce((acc, course) => acc + (course.duration || 0), 0) || 0}
              </p>
            </div>
          </div>
        </div>
        
        {courses && courses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 w-full max-w-[200px]">
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">{course.progress}%</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.status === "Active" ? "default" : "outline"}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Play size={14} className="mr-1" />
                      Continue
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoursesModal;
