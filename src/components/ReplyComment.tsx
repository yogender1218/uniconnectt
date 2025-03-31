
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Comment } from "@/services/api";

interface ReplyCommentProps {
  comment: Comment;
  onReply: (commentId: string, content: string) => void;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  // Handle null or undefined comment
  if (!comment || !comment.author) {
    return null;
  }

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText("");
      setIsReplying(false);
    }
  };

  const authorName = comment.author?.name || "Unknown";
  const authorInitial = authorName.charAt(0) || "?";
  const createdAt = comment.createdAt || new Date().toISOString();
  const replies = comment.replies || [];

  return (
    <div className="mb-3">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
            {authorInitial}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{authorName}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-1 text-xs text-muted-foreground" 
            onClick={() => setIsReplying(!isReplying)}
          >
            {isReplying ? "Cancel" : "Reply"}
          </Button>
          
          {isReplying && (
            <div className="mt-2 flex gap-2">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="min-h-[60px] text-sm resize-none"
              />
              <Button 
                type="button" 
                size="icon" 
                onClick={handleReply} 
                disabled={!replyText.trim()}
                className="shrink-0"
              >
                <Send size={18} />
              </Button>
            </div>
          )}
          
          {replies.length > 0 && (
            <div className="pl-5 mt-3 space-y-3">
              {replies.map((reply) => {
                if (!reply || !reply.author) return null;
                const replyAuthorName = reply.author?.name || "Unknown";
                const replyAuthorInitial = replyAuthorName.charAt(0) || "?";
                const replyCreatedAt = reply.createdAt || new Date().toISOString();
                
                return (
                  <div key={reply.id} className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        {replyAuthorInitial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-secondary/70 rounded-lg p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-xs">{replyAuthorName}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(replyCreatedAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs">{reply.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
