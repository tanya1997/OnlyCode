import { fetchMlServer } from "../fetch-ml-server.mjs";
import { escapeStr } from "../sql-utils.mjs";

let qqq = 1;
export const handlers = (app) => (sql) => {
  app.post("/api/prompts", async (req, res) => {
    try {
      console.log({
        method: "POST",
        url: "/",
        body: req.body,
      });
      const response = { id: "response-id" + qqq++ };
      //  const response = await fetchMlServer({
      //    method: "POST",
      //    url: "/",
      //    body: req.body,
      //  });
      console.log({ response });

      await sql(
        `INSERT INTO "PromptsRequests"(
          "PromptId",
          "ClientId",
          "Payload"
        ) VALUES (
          ${escapeStr(response.id)},
          ${escapeStr(req.headers["X-Client-Id"])},
          ${escapeStr(JSON.stringify(req.body))}
        );`,
        true,
      );

      res.json(response);
    } catch (error) {
      res.end(`${error}`);
    }
  });
};

export const init = async (sql) => {
  await sql(
    `CREATE TABLE IF NOT EXISTS "PromptsRequests"(
      "PromptId" VARCHAR(190) NOT NULL,
      "ClientId" VARCHAR(190) NOT NULL,
      "Payload" JSONB NOT NULL,
      PRIMARY KEY("PromptId")
    );`,
    true,
  );
  await sql(
    `CREATE TABLE IF NOT EXISTS "PromptsResponses"(
      "PromptId" VARCHAR(190) NOT NULL,
      "ImageIdx" NUMBER NOT NULL,
      "ImageContent" TEXT NOT NULL,
      PRIMARY KEY("PromptId", "ImageIdx")
    );`,
    true,
  );
};
