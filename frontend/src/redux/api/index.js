import { clearSession, getSession, saveSession } from "./session";
import { request } from "./request";
import { b64toBlobUrl } from "./b64-to-blob-url";

export const createApi = () => {
  const headers = {};

  const { token, isAdmin } = getSession();
  saveSession({ headers, token, isAdmin });

  return {
    /* LOGIN / LOGOUT */

    async login({ username, password }) {
      try {
        const { token, isAdmin } = await request({
          url: "/api/login",
          method: "POST",
          payload: { username, password },
        });
        saveSession({ headers, token, isAdmin });
      } catch (error) {
        error.name = "LoginError";
        throw error;
      }
    },

    async logout() {
      clearSession({ headers });
    },

    /* ML */

    async startML() {
      try {
        await request({ url: "/api/ml/start", method: "PUT", payload: {} });
      } catch (error) {
        error.name = "StartMLServerError";
        throw error;
      }
    },

    async stopML() {
      try {
        await request({ url: "/api/ml/stop", method: "PUT", payload: {} });
      } catch (error) {
        error.name = "StopMLServerError";
        throw error;
      }
    },

    async statusML() {
      try {
        const { status } = await request({
          url: "/api/ml/status",
          method: "GET",
          payload: {},
        });
        return status;
      } catch (error) {
        error.name = "GetMLStatusError";
        throw error;
      }
    },

    /* PROMPTS */

    async sendPrompt({ text }) {
      const { id, imgIds, rating } = await request({
        url: "/api/prompts",
        method: "POST",
        payload: { text },
        headers,
      });
      return { id, text, imgIds, rating };
    },

    async listPrompts() {
      const { prompts } = await request({
        url: "/api/prompts",
        method: "GET",
        payload: {},
        headers,
      });
      return prompts.map(({ id, text, imgIds, rating }) => ({
        id,
        text,
        imgIds,
        rating,
      }));
    },

    /* PROMPTS.RATING */

    async likePrompt(id) {
      const rating = await request({
        url: `/api/prompts/${id}/like`,
        method: "PUT",
        payload: {},
        headers,
      });
      return rating;
    },

    async dislikePrompt(id) {
      const rating = await request({
        url: `/api/prompts/${id}/dislike`,
        method: "PUT",
        payload: {},
        headers,
      });
      return rating;
    },

    /* IMAGES */

    async loadImage(id) {
      const { status, contentType, b64Data } = await request({
        url: `/api/images/${id}}`,
        method: "GET",
        payload: {},
        headers,
      });

      const result = { status, img: null };
      if (status === "ready") {
        result.img = b64toBlobUrl(b64Data, contentType);
      }
      return result;
    },

    /* USERS */

    async listUsers() {
      const { users } = await request({
        url: "/api/users",
        method: "GET",
        payload: {},
        headers,
      });

      return users.map(({ username, password, isAdmin }) => ({
        username,
        password,
        isAdmin,
      }));
    },

    async updateUser({ username, password, isAdmin }) {
      await request({
        url: "/api/users",
        method: "PUT",
        payload: { username, password, isAdmin },
        headers,
      });
    },

    async createUser({ username, password, isAdmin }) {
      await request({
        url: "/api/users",
        method: "POST",
        payload: { username, password, isAdmin },
        headers,
      });
    },

    async deleteUser({ username }) {
      await request({
        url: "/api/users",
        method: "DELETE",
        payload: { username },
        headers,
      });
    },

    getSession() {
      return getSession();
    },

    clearSession() {
      return clearSession({ headers });
    },
  };
};
