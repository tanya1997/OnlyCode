import {
  startMLServer,
  stopMLServer,
  getMLStatus,
} from "../ml-server-utils/index.mjs";

export const handlers = (app) => (sql) => {
  app.get("/api/ml/status", async (req, res) => {
    try {
      const { status } = await getMLStatus();
      res.json({ status });
    } catch (error) {
      console.error(error);
      res.status(500);
      res.end();
    }
  });

  app.get("/api/ml/start", async (req, res) => {
    try {
      await startMLServer();
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500);
      res.end();
    }
  });

  app.get("/api/ml/stop", async (req, res) => {
    try {
      await stopMLServer();
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500);
      res.end();
    }
  });
};
