import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../api";

export const TopicContainer = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topicsData) => {
        setTopics(topicsData);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

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
