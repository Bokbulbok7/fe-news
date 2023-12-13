import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";

export const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(articleId)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setIsLoading(false);
      });
  }, [articleId]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="ArticlePage">
      <h1>{article.title}</h1>
      <p>By: {article.author}</p>
      <p>Published: {article.created_at}</p>
      <p>Topic: {article.topic}</p>
      <img src={article.article_img_url} alt="Article" />
      <p>{article.body}</p>
      <p>Number of votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
    </div>
  );
};
