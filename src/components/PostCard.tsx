
import React, { useState } from "react";
import { formatDistance } from "date-fns";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Post } from "@/services/api";
import CommentSection from "@/components/CommentSection";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import UserProfileModal from "@/components/UserProfileModal";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onReplyToComment?: (postId: string, commentId: string, content: string) => void;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ 
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
  
  const handleAddComment = (content: string) => {
    onComment(post.id, content);
  };
  
  const handleReplyToComment = (commentId: string, content: string) => {
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
