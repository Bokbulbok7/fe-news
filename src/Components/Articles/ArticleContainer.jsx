import { useEffect, useState } from "react";
import { ArticlesList } from "./ArticlesList";
import { getArticles } from "../../api";
import { useParams } from "react-router-dom";

export const ArticleContainer = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");

  useEffect(() => {
    setIsLoading(true);
    getArticles({ topic, sortBy, sortOrder })
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  }, [topic, sortBy, sortOrder]);

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

  const handleSortBy = (criteria) => {
    setSortBy(criteria);
    setIsLoading(true);
    getArticles({ topic, sortBy: criteria, sortOrder })
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
    setIsLoading(true);
    getArticles({ topic, sortBy, sortOrder: order })
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="ArticleContainer">
      <h2>ArticleContainer</h2>
      <div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <label htmlFor="sortByDropdown">Sort by:</label>
        <select
          id="sortByDropdown"
          onChange={(e) => handleSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <label htmlFor="sortOrderDropdown">Order:</label>
        <select
          id="sortOrderDropdown"
          onChange={(e) => handleSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>
      <ArticlesList articles={articles} />
    </div>
  );
};
