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
  return api.get(`/articles/${articleId}`).then((response) => {
    return response.data.article;
  });
};

export const getCommentsByArticleId = (articleId) => {
  return api
    .get(`/articles/${articleId}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
      throw error;
    });
};

export const postComment = (articleId, newComment) => {
  console.log(articleId, newComment);
  return api
    .post(`/articles/${articleId}/comments`, newComment)
    .then((response) => {
      console.log("Comment added:", response.data);
      return response.data.comment;
    })
    .catch((error) => {
      console.error("Error adding comment:", error);
      throw error;
    });
};
