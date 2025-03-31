
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SlideIn } from "@/components/Animations";
import AnalyticCard from "@/components/dashboard/AnalyticCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";

interface AnalyticsSectionProps {
  analyticsData: {
    name: string;
    posts: number;
    engagement: number;
    connections: number;
  }[];
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ analyticsData }) => {
  return (
    <SlideIn>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>Your activity and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AnalyticCard title="Total Posts" value="12" change="+3" />
            <AnalyticCard title="Engagement" value="87%" change="+5.2%" />
            <AnalyticCard title="Connections" value="34" change="+7" />
          </div>
          
          <AnalyticsChart data={analyticsData} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Download Report</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>View Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Detailed Analytics</DialogTitle>
                <DialogDescription>
                  Comprehensive view of your platform activity and metrics
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-4">
                <AnalyticCard title="Total Posts" value="12" change="+3" />
                <AnalyticCard title="Engagement" value="87%" change="+5.2%" />
                <AnalyticCard title="Connections" value="34" change="+7" />
                <AnalyticCard title="Profile Views" value="246" change="+18%" />
                <AnalyticCard title="Content Shares" value="28" change="+12" />
                <AnalyticCard title="Avg. Response" value="12m" change="-2m" />
              </div>
              
              <div className="h-80 w-full">
                <AnalyticsChart data={analyticsData} />
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Engagement Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-border p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Top Performing Posts</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>AI in Education</span>
                        <Badge variant="outline">98 likes</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>Machine Learning Research</span>
                        <Badge variant="outline">76 likes</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>Data Visualization</span>
                        <Badge variant="outline">64 likes</Badge>
                      </li>
                    </ul>
                  </div>
                  <div className="border border-border p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Peak Activity Times</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Monday - Friday</span>
                        <Badge variant="outline">2PM - 5PM</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>Weekends</span>
                        <Badge variant="outline">10AM - 1PM</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>Most Active Day</span>
                        <Badge variant="outline">Wednesday</Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </SlideIn>
  );
};

export default AnalyticsSection;
