import { useContext, useEffect, useState } from "react";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { deleteComment, getCommentsByArticleId, postComment } from "../../api";
import { UserContext } from "../Users/UserContext";

export const CommentContainer = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const loggedInUser = useContext(UserContext);

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
        setComments([postedComment, ...comments]);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        setError("Something went wrong. Please try again later.");
      });
  };

  const handleDeleteComment = (commentId) => {
    console.log(defaultUsername, loggedInUser);
    if (deletingId === commentId) return;
    setDeletingId(commentId);
    deleteComment(commentId)
      .then(() => {
        setComments(
          comments.filter((comment) => comment.comment_id !== commentId)
        );
        setDeletingId(null);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        setError("Something went wrong. Please try again later.");
        setDeletingId(null);
      });
  };

  return (
    <div className="CommentContainer">
      <h2>Comments</h2>
      <AddComment onAddComment={handleAddComment} />
      {error && <p className="error-message">{error}</p>}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.comment_id}
            comment={comment}
            onDeleteComment={handleDeleteComment}
            deleting={deletingId === comment.comment_id}
            loggedInUser={loggedInUser}
          />
        ))
      ) : (
        <p>No comments available for this article.</p>
      )}
    </div>
  );
};
