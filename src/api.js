import axios from "axios";

const api = axios.create({ baseURL: `https://news-4iag.onrender.com/api` });

export const getArticles = () => {
  return api.get("/articles").then((response) => {
    return response.data.articles;
  });
};

export const getTopics = () => {
  return api.get("/topics").then((response) => {
    return response.data.topics;
  });
};

export const getArticleById = (articleId) => {
  return api
    .get(`/articles/${articleId}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      throw error;
    });
};
