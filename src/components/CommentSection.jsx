
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ReplyComment from "@/components/ReplyComment";

const CommentSection = ({ 
  comments = [], 
  onAddComment, 
  onReplyToComment 
}) => {
  const [commentText, setCommentText] = useState("");
  
  const handleAddComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  // Make sure comments is an array even if it's null/undefined
  const safeComments = Array.isArray(comments) ? comments : [];
  
  return (
    <div className="border-t border-border p-4">
      <div className="space-y-4">
        {safeComments.length > 0 ? (
          <>
            <Separator />
            <div className="space-y-3">
              {safeComments.map((comment) => (
                <ReplyComment 
                  key={comment.id} 
                  comment={comment} 
                  onReply={onReplyToComment || (() => {})}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-center text-muted-foreground py-2">
            No comments yet. Be the first to comment!
          </p>
        )}
        
        <div className="flex items-start gap-2 mt-4">
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="min-h-[80px] resize-none"
            onKeyPress={handleKeyPress}
          />
          <Button 
            type="button" 
            size="icon" 
            onClick={handleAddComment} 
            disabled={!commentText.trim()}
            className="shrink-0"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
