import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../api";
import Error from "../../Error";

export const TopicContainer = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopics()
      .then((topicsData) => {
        setTopics(topicsData);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setError("Error fetching topics. Please try again later.");
      });
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>
              <h3>{topic.slug}</h3>
              <p>{topic.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
