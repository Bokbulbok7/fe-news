import axios from "axios";

export const getArticles = () => {
  const baseUrl = `https://news-4iag.onrender.com/api/articles`;
  return axios.get(baseUrl).then((response) => {
    return response.data.articles;
  });
};

export const getTopics = () => {
  const baseUrl = `https://news-4iag.onrender.com/api/topics`;
  return axios.get(baseUrl).then((response) => {
    return response.data.topics;
  });
};
