export const Comment = ({ comment }) => {
  return (
    <div className="Comment">
      <p className="username">By: {comment.author}</p>
      <p className="comment-body">{comment.body}</p>
      <p>Votes: {comment.votes}</p>
      <p className="comment-date">
        Created at: {new Date(comment.created_at).toLocaleString()}
      </p>
    </div>
  );
};
