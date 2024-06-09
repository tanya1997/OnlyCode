import { fetchMlServer } from "../fetch-ml-server.mjs";

export const handlers = (app) => (sql) => {
  app.get("/api/ml", async (req, res) => {
    try {
      const response = await fetchMlServer({
        method: "POST",
        url: "/",
        body: "Потребительский кредит под залог недвижимости со ставкой 17 процентов",
      });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.end();
    }
  });

  app.get("/api/ml2", async (req, res) => {
    try {
      const response = await fetchMlServer({
        method: "GET",
        url: "/",
      });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.end();
    }
  });

  app.get("/api/ml3", async (req, res) => {
    try {
      const response = await fetchMlServer({
        method: "POST",
        url: "/",
        body: "Потребительский кредит под залог недвижимости со ставкой 17 процентов",
        baseUrl: "http://5.35.11.130:3002",
      });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.end();
    }
  });

  app.get("/api/ml4", async (req, res) => {
    try {
      const response = await fetchMlServer({
        method: "GET",
        url: "/",
        baseUrl: "http://5.35.11.130:3002",
      });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.end();
    }
  });
};
