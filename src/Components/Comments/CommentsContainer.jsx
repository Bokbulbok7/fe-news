import { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { getCommentsByArticleId, postComment } from "../../api"; // Replace with your API functions
import Error from "../../Error";

export const CommentContainer = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Error fetching comments. Please try again later.");
      });
  }, [articleId]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <Error message={error} />;
  }

  const handleAddComment = (newComment) => {
    const defaultUsername = "cooljmessy";
    const commentWithUsername = {
      username: defaultUsername,
      ...newComment,
    };

    postComment(articleId, commentWithUsername)
      .then((postedComment) => {
        setComments([postedComment, ...comments]);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="CommentContainer">
      <h2>Comments</h2>
      <AddComment onAddComment={handleAddComment} />
      {error && <p className="error-message">{error}</p>}
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
