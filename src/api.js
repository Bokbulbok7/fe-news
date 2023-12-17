import axios from "axios";

const api = axios.create({ baseURL: `https://news-4iag.onrender.com/api` });

export const getArticles = (topicSlug) => {
  console.log(topicSlug);
  const query = topicSlug ? `?topic=${topicSlug}` : "";
  return api.get(`/articles${query}`).then((response) => {
    console.log(topicSlug);
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

export const patchArticle = (articleId, increment) => {
  return api
    .patch(`/articles/${articleId}`, increment)
    .then((response) => {
      return response.data.article.votes;
    })
    .catch((error) => {
      console.error("Error voting:", error);
      throw error;
    });
};

export const deleteComment = (commentId) => {
  return api
    .delete(`/comments/${commentId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting comment:", error);
      throw error;
    });
};