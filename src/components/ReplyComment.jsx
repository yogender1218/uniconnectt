
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reply, Send } from "lucide-react";

const ReplyComment = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(true);
  
  // Handle null or undefined comment
  if (!comment || !comment.user) {
    return null;
  }
  
  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText("");
      setIsReplying(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitReply();
    }
  };
  
  const userName = comment.user.name || "Unknown User";
  const userAvatar = comment.user.avatar;
  const initial = userName.charAt(0) || "?";
  const hasReplies = comment.replies && comment.replies.length > 0;
  
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          {userAvatar && <AvatarImage src={userAvatar} alt={userName} />}
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {initial}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{userName}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-sm">{comment.content}</p>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs text-muted-foreground"
            onClick={() => setIsReplying(!isReplying)}
          >
            <Reply size={14} className="mr-1" />
            Reply
          </Button>
        </div>
      </div>
      
      {isReplying && (
        <div className="ml-10 flex items-start gap-2">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="min-h-[60px] text-sm resize-none"
            onKeyPress={handleKeyPress}
          />
          <Button 
            type="button" 
            size="icon" 
            onClick={handleSubmitReply} 
            disabled={!replyText.trim()}
            className="shrink-0 h-8 w-8"
          >
            <Send size={14} />
          </Button>
        </div>
      )}
      
      {hasReplies && (
        <div className="ml-10 space-y-3">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? "Hide replies" : `Show ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`}
            </Button>
          </div>
          
          {showReplies && (
            <div className="space-y-3">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex gap-3">
                  <Avatar className="h-6 w-6">
                    {reply.user?.avatar && <AvatarImage src={reply.user.avatar} alt={reply.user?.name || "User"} />}
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {(reply.user?.name || "?").charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{reply.user?.name || "Unknown User"}</span>
                      <span className="text-xs text-muted-foreground">
                        {reply.createdAt ? new Date(reply.createdAt).toLocaleDateString() : "Unknown date"}
                      </span>
                    </div>
                    
                    <p className="text-sm">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReplyComment;
