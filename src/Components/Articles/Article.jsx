import { Link } from "react-router-dom";

const Article = ({ article }) => {
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-UK",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return (
    <div className="Article">
      <h3 className="article-title">
        <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
      </h3>
      <p className="article-info">
        <label className="article-author">By: {article.author}</label>
        <label className="article-date">Published: {formattedDate}</label>
        <label className="article-topic">Topic: {article.topic}</label>
      </p>
      <img
        className="article-image"
        src={article.article_img_url}
        alt="Article Image"
      />
      <p className="article-reviews">
        <label className="article_votes">
          Number of votes: {article.votes}
        </label>
        <label className="article_comments">
          Comments: {article.comment_count}
        </label>
      </p>
    </div>
  );
};

export default Article;
