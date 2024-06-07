import "dotenv/config";

import * as http from "http";
import * as path from "path";
import express from "express";

import {HOST, PORT, reactScriptsBuildDir, rootDir} from "./constants.mjs";
import {prepareRequestMiddleware} from "./prepare-request-middleware.mjs";
import {initSqlite} from "./init-sqlite.mjs";
import * as entities from "./entities/index.mjs";

const startApiServer = (app) => async (sql) => {
  app.use("/api/*", prepareRequestMiddleware);

  for(const {handlers} of Object.values(entities)) {
    handlers?.(app)(sql)
  }

  app.use(express.static(reactScriptsBuildDir));

  app.get("/", (req, res) => {
    res.sendFile(path.join(reactScriptsBuildDir, "index.html"));
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

  try {
    const { sql, finalizer: sqlFinalizer } = await initSqlite(entities)
    finalizers.push(sqlFinalizer);
    finalizers.push(await startApiServer(app)(sql));
  } catch (error) {
    console.error(`Initialisation error: ${error}`);
    await finaliseAll();
  }
};

void main();
