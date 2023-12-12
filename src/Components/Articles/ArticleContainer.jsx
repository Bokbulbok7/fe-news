import { useEffect, useState } from "react";
import { ArticlesList } from "./ArticlesList";
import { getArticles } from "../../api";

export const ArticleContainer = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getArticles()
      .then((articlesData) => {
        setArticles(articlesData);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

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
