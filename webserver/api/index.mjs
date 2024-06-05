import "dotenv/config";

import * as http from "http";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";
import express from "express";
import { fetchMlServer} from "./fetch-ml-server";
import {prepareRequestMiddleware} from "./prepare-request-middleware";
import * as users from './entities/users.js'
import {PORT} from "./constants";
import {entities} from "./entities/index.js";

// UNSAFE EXPEREMENTAL API FOR INTERNAL USE ONLY!

// Single query with SELECT statement and result set - no semicolon at end
// http://localhost:3000/direct-single-sql-query-exec?SELECT%20123

// Multiple queries separated by semicolon with semicolon at end - no result set
// http://localhost:3000/direct-multi-sql-query-exec?BEGIN%20IMMEDIATE;
// http://localhost:3000/direct-multi-sql-query-exec?SELECT%201/0;
// http://localhost:3000/direct-multi-sql-query-exec?ROLLBACK;

// Image as bytes stream
// http://localhost:3000/images/original/NBO-new_tulips.png

// Image as base64 encoded stream
// http://localhost:3000/images/base64/NBO-new_tulips.png

// Images list as json
// http://localhost:3000/images/



const rootDir = path.dirname(url.fileURLToPath(import.meta.url));
const reactScriptsBuild = path.join(rootDir, "build");

const makeApiServer = async (app) => {
  for(const {handlers} of entities) {
    if(handlers) {
      handlers(app)
    }
  }

  app.use(express.static(reactScriptsBuild));

  app.get("/", (req, res) => {
    res.sendFile(path.join(reactScriptsBuild, "index.html"));
  });
};


const initApiServer = async () => {
  const app = express();

  app.use("*", prepareRequestMiddleware);

  await makeApiServer(app);
  const server = new http.Server(app);
  await new Promise((resolve, reject) => {
    const initApiErrorHandler = (err) => reject(err);
    server.once("error", initApiErrorHandler);
    server.listen(+PORT, "0.0.0.0", () => {
      server.removeListener("error", initApiErrorHandler);
      console.log(`Application listening on port ${PORT}!`);
      resolve();
    });
  });
  const finaliser = async () => {
    await server.close();
  };
  return finaliser;
};

const main = async () => {
  const finalisers = [];
  const finaliseAll = async () => {
    await Promise.allSettled(
      finalisers.map((fn) =>
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

  try {
    finalisers.push(await initSqlite(entities));
    finalisers.push(await initApiServer());
  } catch (error) {
    console.error(`Initialisation error: ${error}`);
    await finaliseAll();
  }
};

void main();
