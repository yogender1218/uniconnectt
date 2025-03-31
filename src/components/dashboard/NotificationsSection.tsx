
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { SlideIn } from "@/components/Animations";
import NotificationItem from "@/components/dashboard/NotificationItem";
import { MessagesSquare, Heart, Briefcase, Users, Star, UserPlus, Bell, FileText } from "lucide-react";

interface NotificationsSectionProps {
  isAllNotificationsOpen: boolean;
  setIsAllNotificationsOpen: (open: boolean) => void;
  handleViewAllNotifications: () => void;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  isAllNotificationsOpen,
  setIsAllNotificationsOpen,
  handleViewAllNotifications
}) => {
  return (
    <SlideIn>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stay updated with your recent activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotificationItem 
            icon={<Star className="text-amber-500" size={16} />}
            title="New achievement unlocked"
            description="You've completed 5 consecutive days of activity"
            time="1 hour ago"
          />
          <NotificationItem 
            icon={<UserPlus className="text-green-500" size={16} />}
            title="New follower"
            description="Alex Johnson started following you"
            time="3 hours ago"
          />
          <NotificationItem 
            icon={<Bell className="text-blue-500" size={16} />}
            title="Event reminder"
            description="Virtual workshop on AI starts in 2 hours"
            time="5 hours ago"
          />
          <NotificationItem 
            icon={<FileText className="text-purple-500" size={16} />}
            title="New post from Sarah Williams"
            description="Sarah shared a post about EdTech investments"
            time="Yesterday"
          />
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleViewAllNotifications}
          >
            View all notifications
          </Button>
        </CardFooter>
      </Card>

      <Sheet open={isAllNotificationsOpen} onOpenChange={setIsAllNotificationsOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-5">
            <SheetTitle>All Notifications</SheetTitle>
            <SheetDescription>
              Your recent activity and updates
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-3">
            <NotificationItem 
              icon={<Star className="text-amber-500" size={16} />}
              title="New achievement unlocked"
              description="You've completed 5 consecutive days of activity"
              time="1 hour ago"
            />
            <NotificationItem 
              icon={<UserPlus className="text-green-500" size={16} />}
              title="New follower"
              description="Alex Johnson started following you"
              time="3 hours ago"
            />
            <NotificationItem 
              icon={<Bell className="text-blue-500" size={16} />}
              title="Event reminder"
              description="Virtual workshop on AI starts in 2 hours"
              time="5 hours ago"
            />
            <NotificationItem 
              icon={<FileText className="text-purple-500" size={16} />}
              title="New post from Sarah Williams"
              description="Sarah shared a post about EdTech investments"
              time="Yesterday"
            />
            <Separator />
            <NotificationItem 
              icon={<MessagesSquare className="text-blue-500" size={16} />}
              title="New comment on your post"
              description="Maria commented: 'Great insights on the future of AI education!'"
              time="2 days ago"
            />
            <NotificationItem 
              icon={<Heart className="text-red-500" size={16} />}
              title="Your post was liked"
              description="5 people liked your post about machine learning applications"
              time="3 days ago"
            />
            <NotificationItem 
              icon={<Briefcase className="text-amber-600" size={16} />}
              title="Project deadline approaching"
              description="'Data Visualization Tool' is due in 5 days"
              time="3 days ago"
            />
            <NotificationItem 
              icon={<Users className="text-indigo-500" size={16} />}
              title="New study group invitation"
              description="You've been invited to join 'Advanced AI Techniques' study group"
              time="1 week ago"
            />
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full" onClick={() => setIsAllNotificationsOpen(false)}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </SlideIn>
  );
};

export default NotificationsSection;
