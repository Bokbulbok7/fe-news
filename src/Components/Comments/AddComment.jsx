import { useState } from "react";

export const AddComment = ({ onAddComment }) => {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (newComment.trim() !== "") {
      onAddComment({ body: newComment });
      setNewComment("");
    } else {
      setError("Please enter a comment.");
    }
  };

  return (
    <div className="AddComment">
      <h3>Add a Comment</h3>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Type your comment here..."
      ></textarea>
      <button onClick={handleSubmit}>Add Comment</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
