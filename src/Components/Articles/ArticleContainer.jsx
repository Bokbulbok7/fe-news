import { useEffect, useState } from "react";
import { ArticlesList } from "./ArticlesList";
import { getArticles } from "../../api";
import { useParams } from "react-router-dom";

export const ArticleContainer = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic)
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchedArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setArticles(searchedArticles);
  };

  return (
    <div className="ArticleContainer">
      <h2>ArticleContainer</h2>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ArticlesList articles={articles} />
    </div>
  );
};
