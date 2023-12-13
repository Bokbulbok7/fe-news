import { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { getCommentsByArticleId, postComment } from "../../api"; // Replace with your API functions

export const CommentContainer = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(articleId)
      .then((commentsData) => {
        setComments(commentsData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
      });
  }, [articleId]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleAddComment = (newComment) => {
    const defaultUsername = "cooljmessy";
    const commentWithUsername = {
      username: defaultUsername,
      ...newComment,
    };
    postComment(articleId, commentWithUsername)
      .then((postedComment) => {
        setComments([...comments, postedComment]);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  return (
    <div className="CommentContainer">
      <h2>Comments</h2>
      <AddComment onAddComment={handleAddComment} />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.comment_id} comment={comment} />
        ))
      ) : (
        <p>No comments available for this article.</p>
      )}
    </div>
  );
};
