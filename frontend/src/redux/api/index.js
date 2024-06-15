import { clearSession, getSession, saveSession } from "./session";
import { request } from "./request";
import { b64toBlobUrl } from "./b64-to-blob-url";

export const createApi = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const { token, isAdmin, clientId } = getSession();
  saveSession({ headers, token, isAdmin, clientId });

  return {
    /* LOGIN / LOGOUT */

    async login({ username, password }) {
      try {
        const { token, isAdmin, clientId } = await request({
          url: "/api/login",
          method: "POST",
          payload: { username, password },
        });
        saveSession({ headers, token, isAdmin, clientId });
        return { token, isAdmin, clientId };
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

    async sendPrompt(prompt) {
      const { id } = await request({
        url: "/api/prompts",
        method: "POST",
        payload: prompt,
        // {
        //   user_info: {
        //     gender: "0",
        //     age: "25",
        //     wage: "2000000",
        //     cluster: "super",
        //   },
        //   banner: {
        //     type: "png",
        //     banner_type: "background",
        //     width: "512",
        //     height: "512",
        //   },
        //   prompt: "string",
        //   product: "AUTO",
        // },
        headers,
      });

      console.log(id);
      return id;
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
      const images = await request({
        url: `/api/images/${id}`,
        method: "GET",
        payload: {},
        headers,
      });

      return images.map((b64Data) => b64toBlobUrl(b64Data, ""));
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
