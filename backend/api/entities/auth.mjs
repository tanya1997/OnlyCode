export const handlers = (app) => (sql) => {
  app.post("/api/login", async (req, res) => {
    try {
      res.json({ token: "token", isAdmin: true, clientId: "clientId" });
    } catch (error) {
      res.status(401);
      res.end(`${error}`);
    }
  });
};
