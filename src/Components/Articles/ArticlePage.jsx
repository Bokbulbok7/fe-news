import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";
import { CommentContainer } from "../Comments/CommentsContainer";

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
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-UK",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
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
      <CommentContainer articleId={article.article_id} />
    </div>
  );
};
