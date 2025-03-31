
import React, { useState } from "react";
import { formatDistance } from "date-fns";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import CommentSection from "@/components/CommentSection";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import UserProfileModal from "@/components/UserProfileModal";

const PostCard = ({ 
  post, 
  onLike, 
  onComment,
  onReplyToComment,
  className 
}) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  
  // Handle null or undefined post
  if (!post) {
    return null;
  }
  
  const handleLike = () => {
    onLike(post.id);
  };
  
  const handleAddComment = (content) => {
    onComment(post.id, content);
  };
  
  const handleReplyToComment = (commentId, content) => {
    if (onReplyToComment) {
      onReplyToComment(post.id, commentId, content);
    }
  };
  
  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  // Ensure post.author exists
  const author = post.author || { name: "Unknown", id: "0" };
  const authorName = author.name || "Unknown";
  const authorInitial = authorName.charAt(0) || "?";
  
  // Get media attachments if available - handle various API formats
  const mediaFiles = post.media_files || post.files || [];

  return (
    <div className={cn("border border-border rounded-lg overflow-hidden bg-card", className)}>
      {/* Post header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3" onClick={() => setIsUserProfileOpen(true)} style={{ cursor: 'pointer' }}>
          <Avatar>
            <AvatarFallback>{authorInitial}</AvatarFallback>
          </Avatar>
          
          <div>
            <p className="font-medium">{authorName}</p>
            <p className="text-xs text-muted-foreground">
              {post.createdAt ? formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true }) : "Recently"}
            </p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save post</DropdownMenuItem>
            <DropdownMenuItem>Report post</DropdownMenuItem>
            <DropdownMenuItem>Hide post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Post content */}
      <div className="px-4 pb-4">
        <p className="mb-3 whitespace-pre-line">{post.content || "No content"}</p>
        
        {post.hashtags && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.hashtags.split(",").map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag.trim()}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Media files display */}
        {mediaFiles && mediaFiles.length > 0 && (
          <div className={`grid gap-2 mb-4 ${mediaFiles.length === 1 ? 'grid-cols-1' : mediaFiles.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {mediaFiles.map((file, index) => {
              // Handle different API response formats
              const fileUrl = file.url || file.file_url;
              const fileType = file.type || file.file_type;
              const fileName = file.name || file.filename || `Attachment ${index + 1}`;
              
              const isImage = fileType?.startsWith('image/') || fileUrl?.match(/\.(jpeg|jpg|gif|png)$/i);
              const isVideo = fileType?.startsWith('video/') || fileUrl?.match(/\.(mp4|webm|ogg)$/i);
              
              if (isImage) {
                return (
                  <div key={index} className="rounded-lg overflow-hidden h-64 bg-gray-100">
                    <img 
                      src={fileUrl} 
                      alt={`Post attachment ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              } else if (isVideo) {
                return (
                  <div key={index} className="rounded-lg overflow-hidden h-64 bg-gray-100">
                    <video 
                      src={fileUrl} 
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              } else {
                // For other file types
                return (
                  <div key={index} className="rounded-lg bg-gray-100 h-64 flex items-center justify-center p-4">
                    <div className="text-center">
                      <p className="font-medium mb-2">File Attachment</p>
                      <p className="text-sm text-muted-foreground">{fileName}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      
      {/* Post footer */}
      <div className="px-4 py-2 border-t border-border flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-2"
            onClick={handleLike}
          >
            <Heart 
              size={18} 
              className={post.liked ? "fill-red-500 text-red-500" : ""} 
            />
            <span>{post.likes || 0}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-2"
            onClick={toggleComments}
          >
            <MessageCircle size={18} />
            <span>{post.comments ? post.comments.length : 0}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 px-2"
          >
            <Share2 size={18} />
          </Button>
        </div>
      </div>
      
      {/* Comments section */}
      {isCommentsVisible && post.comments && (
        <CommentSection 
          comments={post.comments} 
          onAddComment={handleAddComment}
          onReplyToComment={handleReplyToComment}
        />
      )}

      {/* User Profile Modal */}
      <UserProfileModal
        user={post.author}
        open={isUserProfileOpen}
        onOpenChange={setIsUserProfileOpen}
      />
    </div>
  );
};

export default PostCard;
