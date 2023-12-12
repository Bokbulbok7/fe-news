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
      <h3 className="article-title">{article.title}</h3>
      <p className="article-info">
        <span className="article-author">By: {article.author}</span>
        <span className="article-date">Published: {formattedDate}</span>
        <span className="article-topic">Topic: {article.topic}</span>
      </p>
      <div className="article-image">
        <img src={article.article_img_url} alt="Article Image" />
      </div>
      <p className="article-reviews">
        <span className="article_votes">Number of votes: {article.votes}</span>
        <span className="article_comments">
          Comments: {article.comment_count}
        </span>
      </p>
    </div>
  );
};

export default Article;
