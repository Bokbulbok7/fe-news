import Article from "./Article";

export const ArticlesList = ({ articles }) => {
  return (
    <div>
      <h2>ArticlesList</h2>
      <div className="ArticlesList">
        {articles.map((article) => (
          <Article key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};
