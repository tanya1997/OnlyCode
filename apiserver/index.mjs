import * as cookie from "cookie";
import * as mimeTypes from "mime-types";
import * as getRawBody from "raw-body";
import * as http from "http";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";
import SQLite from "better-sqlite3";
import express from "express";

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

const makeApiServer = async (app) => {
  app.get("/direct-single-sql-query-exec", async (req, res) => {
    try {
      const result = JSON.stringify(
        await req.runSqlQuery(decodeURIComponent(req.urlQuery)),
      );
      res.end(result);
    } catch (error) {
      res.end(`${error}`);
    }
  });
  app.get("/direct-multi-sql-query-exec", async (req, res) => {
    try {
      await req.runSqlQuery(decodeURIComponent(req.urlQuery), true);
      res.end("DBMS NO-RESULT STATEMENT SUCCESS");
    } catch (error) {
      res.end(`${error}`);
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const users = JSON.stringify(
        await req.runSqlQuery(`SELECT * FROM "Users"`),
      );
      res.end(users);
    } catch (error) {
      res.end(`${error}`);
    }
  });

  app.get("/users/add/:username", async (req, res) => {
    try {
      await req.runSqlQuery(
        `INSERT INTO "Users"("UserName", "UserRole") VALUES(${req.escapeStr(req.params.username)}, NULL);`,
        true,
      );
      res.end("OK");
    } catch (error) {
      res.end(`${error}`);
    }
  });

  app.get("/users/drop/:username", async (req, res) => {
    try {
      await req.runSqlQuery(
        `DELETE FROM "Users" WHERE "UserName" = ${req.escapeStr(req.params.username)}`,
        true,
      );
      res.end("OK");
    } catch (error) {
      res.end(`${error}`);
    }
  });

  app.get("/images", async (req, res) => {
    try {
      const imageList = fs.readdirSync(path.join(rootDir, "images"));
      res.end(JSON.stringify(imageList));
    } catch (error) {
      res.end(`${error}`);
    }
  });

  app.get("/images/original/:imgname", async (req, res) => {
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

  app.get("/images/base64/:imgname", async (req, res) => {
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

const emptyRunSqlQuery = async () => {
  throw new Error("DB not initalized or already disposed");
};
let runSqlQuery = emptyRunSqlQuery;

const initSqlite = async () => {
  let connection = null;
  const randRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const fullJitter = (retries) =>
    new Promise((resolve) =>
      setTimeout(resolve, randRange(0, Math.min(500, 2 * 2 ** retries))),
    );

  const checkSqliteCode = (code, sqliteCode) => {
    return code.constructor === String && code.startsWith(sqliteCode);
  };
  const isPassthroughError = (error) => {
    return (
      error != null &&
      (/cannot rollback - no transaction is active/i.test(error.message) ||
        checkSqliteCode(error.code, "SQLITE_ABORT") ||
        checkSqliteCode(error.code, "SQLITE_BUSY") ||
        checkSqliteCode(error.code, "SQLITE_READONLY") ||
        checkSqliteCode(error.code, "SQLITE_INTERRUPT") ||
        checkSqliteCode(error.code, "SQLITE_LOCKED"))
    );
  };

  const directRunQuery = async (sqlQuery, multiLine = false) => {
    const executor = async (sql) => {
      return !multiLine ? connection.prepare(sql).all() : connection.exec(sql);
    };
    const transformer = !multiLine ? Array.from.bind(Array) : Function("");
    let result = null;
    for (let retry = 0; ; retry++) {
      try {
        result = await executor(sqlQuery);
        break;
      } catch (error) {
        if (isPassthroughError(error)) {
          await fullJitter(retry);
        } else {
          throw error;
        }
      }
    }
    return transformer(result);
  };

  const connectDbAndConfigConnection = async () => {
    for (let retry = 0; ; retry++) {
      try {
        connection = await new SQLite("sqlitedb.db");
        break;
      } catch (error) {
        connection = null;
        if (
          error != null &&
          error.code != null &&
          error.code.constructor === String &&
          error.code.startWith(SQLITE_BUSY)
        ) {
          await fullJitter(retry);
        } else {
          throw error;
        }
      }
    }

    const configureSql = `
        PRAGMA busy_timeout=0;
        PRAGMA encoding='UTF-8';
        PRAGMA synchronous=EXTRA;
        PRAGMA journal_mode=DELETE;
      `;
    while (true) {
      try {
        await directRunQuery(configureSql, true);
        break;
      } catch (error) {
        if (!isPassthroughError(error)) {
          throw error;
        }
        await fullJitter(0);
      }
    }
  };

  const maybeInitOrUpgradeDb = async () => {
    await directRunQuery(
      `CREATE TABLE IF NOT EXISTS "Users"(
          "UserName" VARCHAR(190) NOT NULL,
          "UserRole" VARCHAR(190) NULL,
          PRIMARY KEY("UserName")
        );
        CREATE TABLE IF NOT EXISTS "Prompts"(
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

  await connectDbAndConfigConnection();
  await maybeInitOrUpgradeDb();
  runSqlQuery = directRunQuery;

  const finaliser = async () => {
    runSqlQuery = emptyRunSqlQuery;
    await connection.close();
  };
  return finaliser;
};

const initApiServer = async () => {
  const app = express();
  const normalizeKey = (key, mode) => {
    switch (mode) {
      case "upper-dash-case":
        return key
          .toLowerCase()
          .split(/-/g)
          .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
          .join("-");
      case "dash-case":
        return `${key.charAt(0).toUpperCase()}${key.slice(1).toLowerCase()}`;
      case "lower-case":
        return key.toLowerCase();
      default:
        throw new Error(`Wrong normalize mode ${mode}`);
    }
  };
  const wrapHeadersCaseInsensitive = (headersMap) =>
    Object.create(
      Object.prototype,
      Object.keys(headersMap).reduce((acc, key) => {
        const value = headersMap[key];
        const [upperDashKey, dashKey, lowerKey] = [
          normalizeKey(key, "upper-dash-case"),
          normalizeKey(key, "dash-case"),
          normalizeKey(key, "lower-case"),
        ];

        acc[upperDashKey] = { value, enumerable: true };
        if (upperDashKey !== dashKey) {
          acc[dashKey] = { value, enumerable: false };
        }
        acc[lowerKey] = { value, enumerable: false };

        return acc;
      }, {}),
    );
  const escapeId = (str) => `"${String(str).replace(/(["])/gi, "$1$1")}"`;
  const escapeStr = (str) => `'${String(str).replace(/(['])/gi, "$1$1")}'`;

  app.use("*", async (req, res, next) => {
    const headers = wrapHeadersCaseInsensitive(req.headers);
    const cookies =
      headers.cookie != null && headers.cookie.constructor === String
        ? cookie.parse(headers.cookie)
        : {};

    const [contentType, optionsEntry] = headers.hasOwnProperty("Content-Type")
      ? String(headers["Content-Type"])
          .split(";")
          .map((value) => value.trim().toLowerCase())
      : [];

    let charset = null;
    if (optionsEntry != null && optionsEntry.startsWith("charset=")) {
      charset = optionsEntry.substring("charset=".length);
    }

    if (charset == null) {
      const mimeCharset =
        contentType != null ? mimeTypes.charset(contentType) : null;
      charset = !!mimeCharset ? mimeCharset : "latin1";
    }

    const body = headers.hasOwnProperty("Content-Length")
      ? await getRawBody(req, {
          length: headers["Content-Length"],
          encoding: charset,
        })
      : null;

    req.runSqlQuery = runSqlQuery;
    req.escapeId = escapeId;
    req.escapeStr = escapeStr;
    req.urlQuery = new url.URL(`http://defunct${req.url}`).search.substr(1);
    req.cookies = cookies;
    req.body = body;

    next();
  });

  await makeApiServer(app);
  const server = new http.Server(app);
  await new Promise((resolve, reject) => {
    const initApiErrorHandler = (err) => reject(err);
    server.once("error", initApiErrorHandler);
    server.listen(3000, "0.0.0.0", () => {
      server.removeListener("error", initApiErrorHandler);
      console.log(`Application listening on port 3000!`);
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
    finalisers.push(await initSqlite());
    finalisers.push(await initApiServer());
  } catch (error) {
    console.error(`Initialisation error: ${error}`);
    await finaliseAll();
  }
};

void main();
