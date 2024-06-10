import fs from "fs";
import path from "path";
import { rootDir } from "../constants.mjs";

// Images list as json
// http://localhost:3000/images/

// Image as bytes stream
// http://localhost:3000/images/original/NBO-new_tulips.png

// Image as base64 encoded stream
// http://localhost:3000/images/base64/NBO-new_tulips.png

export const handlers = (app) => (sql) => {
  app.get("/api/images", async (req, res) => {
    try {
      const imageList = fs.readdirSync(path.join(rootDir, "images"));
      res.end(JSON.stringify(imageList));
    } catch (error) {
      res.end(`${error}`);
    }
  });

  app.get("/api/images/original/:imgname", async (req, res) => {
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

  app.get("/api/images/base64/:imgname", async (req, res) => {
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
