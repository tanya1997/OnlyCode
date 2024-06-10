import { fetchMlServer } from "../fetch-ml-server.mjs";

export const handlers = (app) => (sql) => {
  app.post("/api/prompts", async (req, res) => {
    try {
      console.log({
        method: "POST",
        url: "/",
        body: req.body,
      });
      const response = await fetchMlServer({
        method: "POST",
        url: "/",
        body: req.body,
      });
      console.log({ response });
      res.json(response);
    } catch (error) {
      res.end(`${error}`);
    }
  });
};

export const init = async (sql) => {
  await sql(
    `CREATE TABLE IF NOT EXISTS "Prompts"(
          "PromptId" VARCHAR(190) NOT NULL,
          "UserName" VARCHAR(190) NOT NULL,
          "Status" VARCHAR(190) NOT NULL,
          "Rating" TINYINT NULL,
          "Input" JSON NULL,
          "Output" JSON NULL,
          PRIMARY KEY("PromptId")
        );`,
    true,
  );
};
