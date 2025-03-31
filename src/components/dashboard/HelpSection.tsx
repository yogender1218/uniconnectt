
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SlideIn } from "@/components/Animations";
import { BookMarked, Home, MessagesSquare, Users, Briefcase, PlayCircle, ExternalLink, Mail } from "lucide-react";

interface HelpSectionProps {
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
  handleContactSupport: () => void;
}

const HelpSection: React.FC<HelpSectionProps> = ({
  isHelpOpen,
  setIsHelpOpen,
  handleContactSupport
}) => {
  return (
    <SlideIn>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Help Center</CardTitle>
          <CardDescription>Get support and answers to your questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>How do I change my user type?</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-2 pl-4">
                  Go to your profile settings and select "Change User Type" from the dropdown menu.
                </p>
              </details>
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Can I connect my account to other platforms?</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-2 pl-4">
                  Yes! Go to Settings → Integrations to connect your account with other platforms.
                </p>
              </details>
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>How can I report inappropriate content?</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-2 pl-4">
                  Click the three dots menu on any post or comment and select "Report" to notify our moderation team.
                </p>
              </details>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1 flex items-center gap-2">
                  <BookMarked size={16} />
                  <span>User Guide</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>User Guide</DialogTitle>
                  <DialogDescription>
                    Comprehensive guide to using the platform
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 my-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Button variant="outline" className="h-auto p-4 justify-start text-left">
                      <div className="mr-4">
                        <Home size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Getting Started</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Learn the basics of navigating the platform
                        </p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 justify-start text-left">
                      <div className="mr-4">
                        <MessagesSquare size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Communication Tools</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Posting, commenting and messaging
                        </p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 justify-start text-left">
                      <div className="mr-4">
                        <Users size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Building Your Network</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Connecting with peers and collaborators
                        </p>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 justify-start text-left">
                      <div className="mr-4">
                        <Briefcase size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Project Management</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Creating and managing your projects
                        </p>
                      </div>
                    </Button>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-3">Video Tutorials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-border rounded-lg overflow-hidden">
                        <div className="bg-muted h-32 flex items-center justify-center">
                          <PlayCircle size={48} className="text-muted-foreground" />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium">Platform Overview</h4>
                          <p className="text-xs text-muted-foreground">4:25 mins</p>
                        </div>
                      </div>
                      <div className="border border-border rounded-lg overflow-hidden">
                        <div className="bg-muted h-32 flex items-center justify-center">
                          <PlayCircle size={48} className="text-muted-foreground" />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium">Advanced Features</h4>
                          <p className="text-xs text-muted-foreground">6:12 mins</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="outline" 
              className="flex-1 flex items-center gap-2"
              onClick={handleContactSupport}
            >
              <MessagesSquare size={16} />
              <span>Contact Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
            <DialogDescription>
              Our support team is here to help you with any questions or issues
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <MessagesSquare size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Live Chat Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Available Monday-Friday, 9AM-6PM EST
                  </p>
                </div>
                <Button size="sm" className="ml-auto">
                  Chat Now
                </Button>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-sm text-muted-foreground">
                    24/7 response within 24 hours
                  </p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto">
                  Send Email
                </Button>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <ExternalLink size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse our comprehensive help articles
                  </p>
                </div>
                <Button size="sm" variant="ghost" className="ml-auto">
                  Visit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SlideIn>
  );
};

export default HelpSection;
