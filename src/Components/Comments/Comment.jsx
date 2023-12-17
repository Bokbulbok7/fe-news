export const Comment = ({
  comment,
  onDeleteComment,
  deleting,
  loggedInUser,
}) => {
  const handleDelete = () => {
    onDeleteComment(comment.comment_id);
  };
  const isUser = () => {
    return loggedInUser.username === comment.author;
  };

  return (
    <div className="Comment">
      <p className="username">By: {comment.author}</p>
      <p className="comment-body">{comment.body}</p>
      <p>Votes: {comment.votes}</p>
      <p className="comment-date">
        Created at: {new Date(comment.created_at).toLocaleString()}
      </p>
      {isUser() && (
        <button onClick={handleDelete}>
          {deleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
};
