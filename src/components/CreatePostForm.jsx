
import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Paperclip, Image, Video, Send, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import * as studentApi from "@/services/studentApi";

const CreatePostForm = ({ 
  onCreatePost,
  className 
}) => {
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const handleFileSelect = (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Create preview URLs for the files
    const newPreviewUrls = files.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 'file',
      name: file.name
    }));
    
    setSelectedFiles(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    
    // Clear the file input value so the same file can be selected again
    e.target.value = null;
  };
  
  const handleRemoveFile = (index) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index].url);
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && selectedFiles.length === 0) {
      toast.error("Please enter some content or add files for your post");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create FormData to send files
      const formData = new FormData();
      formData.append("content", content);
      formData.append("hashtag", hashtags);
      
      // Add all selected files to the form data
      selectedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
      
      if (user?.type === "student") {
        // Use the student API for students
        await studentApi.createPost(formData);
      }
      
      // Clean up the form
      setContent("");
      setHashtags("");
      // Clear all object URLs to avoid memory leaks
      previewUrls.forEach(file => URL.revokeObjectURL(file.url));
      setSelectedFiles([]);
      setPreviewUrls([]);
      
      // Notify user of success
      toast.success("Post created successfully!");
      
      // Refresh posts list if callback provided
      if (onCreatePost) {
        onCreatePost(content, hashtags, selectedFiles);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className={cn("glass-card", className)}>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Please sign in to create a post.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("glass-card", className)}>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4 pt-5">
          <Textarea
            placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'there'}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 placeholder:text-muted-foreground/70 text-base"
          />
          
          <Input
            placeholder="Add hashtags (comma separated)"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            className="mt-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto placeholder:text-muted-foreground/70 bg-transparent"
          />
          
          {/* File preview area */}
          {previewUrls.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {previewUrls.map((file, index) => (
                <div key={index} className="relative group">
                  {file.type === 'image' ? (
                    <div className="w-24 h-24 rounded-md overflow-hidden">
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    </div>
                  ) : file.type === 'video' ? (
                    <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      <video src={file.url} className="max-w-full max-h-full" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-md bg-gray-100 flex items-center justify-center text-xs p-2 text-center">
                      {file.name}
                    </div>
                  )}
                  <Button 
                    type="button"
                    variant="destructive" 
                    size="icon" 
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {/* Hidden file inputs */}
          <input 
            type="file" 
            ref={imageInputRef} 
            className="hidden" 
            accept="image/*" 
            multiple 
            onChange={(e) => handleFileSelect(e, 'image')}
          />
          <input 
            type="file" 
            ref={videoInputRef} 
            className="hidden" 
            accept="video/*" 
            multiple 
            onChange={(e) => handleFileSelect(e, 'video')}
          />
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            onChange={(e) => handleFileSelect(e, 'file')}
          />
        </CardContent>
        
        <CardFooter className="flex justify-between p-4 pt-0">
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => imageInputRef.current.click()}
            >
              <Image size={20} className="text-blue-500" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => videoInputRef.current.click()}
            >
              <Video size={20} className="text-green-500" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => fileInputRef.current.click()}
            >
              <Paperclip size={20} className="text-amber-500" />
            </Button>
          </div>
          
          <Button 
            type="submit" 
            disabled={(!content.trim() && selectedFiles.length === 0) || isLoading}
            className="flex items-center gap-2"
          >
            <span>{isLoading ? "Posting..." : "Post"}</span>
            <Send size={16} />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePostForm;
