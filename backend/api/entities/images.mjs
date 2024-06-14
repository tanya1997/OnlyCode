import fs from "fs";
import path from "path";
import { fetchMlServer } from "../fetch-ml-server.mjs";
import { escapeStr } from "../sql-utils.mjs";

// Images list as json
// http://localhost:3000/images/

// Image as bytes stream
// http://localhost:3000/images/original/NBO-new_tulips.png

// Image as base64 encoded stream
// http://localhost:3000/images/base64/NBO-new_tulips.png

export const handlers = (app) => (sql) => {
  app.get("/api/images/:id", async (req, res) => {
    try {
      const promptId = String(req.params.id);
      const response = await fetchMlServer({
        method: "GET",
        url: `/?id=${req.params.id}`,
      });
      if (response != null && Array.isArray(response)) {
        void setImmediate(async () => {
          try {
            const [{ ReqCnt }] =
              await sql(`SELECT Count(*) AS "ReqCnt" FROM "PromptsRequests"
              WHERE "PromptId" = ${escapeStr(promptId)} 
            `);
            if (!(ReqCnt > 0)) {
              throw new Error(
                `Request ${promptId} not present in database requests`,
              );
            }
            for (let idx = 0; idx < response.length; idx++) {
              await sql(
                `INSERT INTO "PromptsResponses"(
                  "PromptId",
                  "ImageIdx",
                  "ImageContent"
                    ) VALUES (
                      ${escapeStr(promptId)},
                      ${escapeStr(idx)},
                      ${escapeNum(response[idx])}
                    )
                  ON CONFLICT("PromptId", "ImageIdx") DO UPDATE SET
                  "ImageContent" = ${escapeNum(response[idx])}
                  ;`,
                true,
              );
            }
          } catch (err) {
            console.log(`Async DB error: ${err.stack}`);
          }
        });
      }

      await res.end(response);
    } catch (error) {
      res.end(`${error}`);
    }
  });

  app.get("/api/demo-images", async (req, res) => {
    try {
      const imageList = fs.readdirSync(path.join(rootDir, "images"));
      res.end(JSON.stringify(imageList));
    } catch (error) {
      res.end(`${error}`);
    }
  });

  app.get("/api/demo-images/original/:imgname", async (req, res) => {
    try {
      const imageContent = fs.readFileSync(
        path.join(rootDir, "images", req.params.imgname),
        { flag: "r" },
      );
      res.end(imageContent);
    } catch (error) {
      res.end(`${error}`);
    }
  });

  app.get("/api/demo-images/base64/:imgname", async (req, res) => {
    try {
      const imageContent = fs
        .readFileSync(path.join(rootDir, "images", req.params.imgname), {
          flag: "r",
        })
        .toString("base64");
      res.end(imageContent);
    } catch (error) {
      res.end(`${error}`);
    }
  });
};
