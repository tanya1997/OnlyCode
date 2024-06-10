export const handlers = (app) => (sql) => {
  app.post("/api/login", async (req, res) => {
    try {
      res.json({ token: "token", isAdmin: true });
    } catch (error) {
      res.end(`${error}`);
    }
  });
};
