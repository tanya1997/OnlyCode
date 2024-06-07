import "dotenv/config";

import * as http from "http";
import * as path from "path";
import * as url from "url";
import express from "express";
import {prepareRequestMiddleware} from "./prepare-request-middleware";
import {HOST, PORT} from "./constants";
import * as entities from "./entities";
import {initSqlite} from "./init-sqlite.js";

// Image as bytes stream
// http://localhost:3000/images/original/NBO-new_tulips.png

// Image as base64 encoded stream
// http://localhost:3000/images/base64/NBO-new_tulips.png

const rootDir = path.dirname(url.fileURLToPath(import.meta.url));
const reactScriptsBuild = path.join(rootDir, "build");

const startApiServer = (app) => async (sql) => {
  app.use("*", prepareRequestMiddleware);

  for(const {handlers} of Object.values(entities)) {
    handlers?.(app)(sql)
  }

  app.use(express.static(reactScriptsBuild));

  app.get("/", (req, res) => {
    res.sendFile(path.join(reactScriptsBuild, "index.html"));
  });

  const server = new http.Server(app);

  await new Promise((resolve, reject) => {
    const initApiErrorHandler = (err) => reject(err);
    server.once("error", initApiErrorHandler);
    server.listen(+PORT, HOST, () => {
      server.removeListener("error", initApiErrorHandler);
      console.log(`Application listening on port ${PORT}!`);
      resolve();
    });
  });

  const finalizer = async () => {
    await server.close();
  };

  return finalizer;
};

const main = async () => {
  const finalizers = [];
  const finaliseAll = async () => {
    await Promise.allSettled(
      finalizers.map((fn) =>
        Promise.resolve()
          .then(() => {
            fn();
          })
          .catch((error) => {
            console.error(`Finalisation error: ${error}`);
          }),
      ),
    );
    process.exit(1);
  };
  const unexpectedErrorHandler = (error) => {
    console.error(`Unhandler exception or rejection: ${error}`);
    void finaliseAll();
  };
  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
  process.on("SIGTERM", () => {
    void finaliseAll();
  });

  const app = express(); app.use("*", prepareRequestMiddleware);

  for(const {handlers} of Object.values(entities)) {
    handlers?.(app)(sql)
  }

  app.use(express.static(reactScriptsBuild));

  app.get("/", (req, res) => {
    res.sendFile(path.join(reactScriptsBuild, "index.html"));
  });

  try {
    const { sql, finalizer: sqlFinalizer } = await initSqlite(entities)
    finalizers.push();
    finalizers.push(startApiServer(app));
  } catch (error) {
    console.error(`Initialisation error: ${error}`);
    await finaliseAll();
  }
};

void main();
