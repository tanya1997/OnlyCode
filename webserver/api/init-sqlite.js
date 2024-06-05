import SQLite from "better-sqlite3";

const emptyRunSqlQuery = async () => {
    throw new Error("DB not initalized or already disposed");
};
let runSqlQuery = emptyRunSqlQuery;

export const initSqlite = async (entities) => {
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
        for(const { init } of entities) {
            if(init) { init(directRunQuery) }
        }
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