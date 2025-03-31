
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";

const RoleSpecificContent = ({
  userType,
  setIsCoursesOpen,
  setIsManageCoursesOpen,
  setIsPortfolioOpen
}) => {
  if (userType === "student") {
    return (
      <>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Your Courses</CardTitle>
            <CardDescription>Manage your current courses and assignments</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Advanced Machine Learning</span>
                </div>
                <Badge variant="outline">Assignment due</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Data Structures & Algorithms</span>
                </div>
                <Badge variant="outline">New material</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>Web Development</span>
                </div>
                <Badge variant="outline">Quiz tomorrow</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setIsCoursesOpen(true)}
            >
              View all courses
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Study Groups</CardTitle>
            <CardDescription>Connect with peers for collaborative learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Users size={16} />
                </div>
                <div>
                  <p className="font-medium">Algorithm Study Group</p>
                  <p className="text-xs text-muted-foreground">8 members • Meeting tomorrow</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Users size={16} />
                </div>
                <div>
                  <p className="font-medium">ML Research Team</p>
                  <p className="text-xs text-muted-foreground">12 members • New discussion</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  } else if (userType === "professor") {
    return (
      <>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Your Courses</CardTitle>
            <CardDescription>Manage your teaching schedule and materials</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Advanced NLP</span>
                </div>
                <Badge variant="outline">30 students</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Research Methods</span>
                </div>
                <Badge variant="outline">15 students</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>Computer Vision</span>
                </div>
                <Badge variant="outline">22 students</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setIsManageCoursesOpen(true)}
            >
              Manage courses
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Research Publications</CardTitle>
            <CardDescription>Track your papers and citations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Neural Strategies for Multi-Agent Cooperation</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Journal of AI Research</span>
                  <span>128 citations</span>
                </div>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Quantum Computing for Optimization Problems</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Quantum Systems Journal</span>
                  <span>76 citations</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  } else if (userType === "investor") {
    return (
      <>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Investment Portfolio</CardTitle>
            <CardDescription>Track your investments in education technology</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>LearningAI Inc.</span>
                </div>
                <Badge className="bg-green-500">+12.5%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>VR Education Ltd.</span>
                </div>
                <Badge className="bg-red-500">-2.3%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Remote Labs</span>
                </div>
                <Badge className="bg-green-500">+8.7%</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setIsPortfolioOpen(true)}
            >
              View portfolio
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Funding Opportunities</CardTitle>
            <CardDescription>New projects seeking investment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between">
                  <p className="font-medium">Adaptive Learning Platform</p>
                  <Badge variant="outline">Series A</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  AI-powered platform that personalizes curriculum based on student performance.
                </p>
              </div>
              <Separator />
              <div>
                <div className="flex justify-between">
                  <p className="font-medium">Global Academic Network</p>
                  <Badge variant="outline">Seed</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Platform connecting researchers worldwide for collaborative projects.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
  
  return null;
};

export default RoleSpecificContent;
