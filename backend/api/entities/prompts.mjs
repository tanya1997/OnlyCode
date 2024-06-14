import { fetchMlServer } from "../fetch-ml-server.mjs";
import { escapeNum, escapeStr } from "../sql-utils.mjs";

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

      void setImmediate(async () => {
        try {
          await sql(
            `INSERT INTO "PromptsRequests"(
                  "PromptId",
                  "ClientId",
                  "UserInfoGender",
                  "UserInfoAge",
                  "UserInfoWage",
                  "UserInfoCluster",
                  "BannerType",
                  "BannerBannerType",
                  "BannerWidth",
                  "BannerHeight",
                  "Prompt",
                  "Product"
                ) VALUES (
                  ${escapeStr(response.id)},
                  ${escapeStr(req.body.client_id)},
                  ${escapeNum(req.body.user_info.gender)},
                  ${escapeNum(req.body.user_info.age)},
                  ${escapeNum(req.body.user_info.wage)},
                  ${escapeStr(req.body.user_info.cluster)},
                  ${escapeStr(req.body.banner.type)},
                  ${escapeStr(req.body.banner.banner_type)},
                  ${escapeNum(req.body.banner.width)},
                  ${escapeNum(req.body.banner.height)},
                  ${escapeStr(req.body.prompt)},
                  ${escapeStr(req.body.product)}
                );`,
            true,
          );
        } catch (err) {
          console.log(`Async DB error: ${err.stack}`);
        }
      });

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
          "UserInfoGender" BIT(1) NOT NULL,
          "UserInfoAge" NUMBER NOT NULL,
          "UserInfoWage" NUMBER NOT NULL,
          "UserInfoCluster" VARCHAR(190) NOT NULL,
          "BannerType" VARCHAR(190) NOT NULL,
          "BannerBannerType" VARCHAR(190) NOT NULL,
          "BannerWidth" NUMBER NOT NULL,
          "BannerHeight" NUMBER NOT NULL,
          "Prompt" TEXT,
          "Product" VARCHAR(190) NOT NULL,
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
