import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticle } from "../../api";
import { CommentContainer } from "../Comments/CommentsContainer";
import Error from "../../Error";

export const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(articleId)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
        setVotes(articleData?.votes || 0);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setIsLoading(false);
        setError("Error fetching article. Please try again later.");
      });
  }, [articleId]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <Error message={error} />;
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-UK",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleVote = (increment) => {
    const updatedVotes = increment ? article.votes + 1 : article.votes - 1;
    setArticle({ ...article, votes: updatedVotes });
    patchArticle(article.article_id, { inc_votes: increment ? 1 : -1 })
      .then((newVoteCount) => {
        if (newVoteCount !== updatedVotes) {
          setArticle({ ...article, votes: newVoteCount });
        }
      })
      .catch((error) => {
        console.error("Error voting:", error);
        setArticle({ ...article, votes: article.votes });
        setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="ArticlePage">
      <h1>{article.title}</h1>
      <p>By: {article.author}</p>
      <p>Published: {formattedDate}</p>
      <p>Topic: {article.topic}</p>
      <img src={article.article_img_url} alt="Article" />
      <p>{article.body}</p>
      <p>Number of votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => handleVote(true)}>Upvote</button>
      <button onClick={() => handleVote(false)}>Downvote</button>
      <CommentContainer articleId={article.article_id} />
    </div>
  );
};
