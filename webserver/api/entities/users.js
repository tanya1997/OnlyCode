export const init = async sql => {
    await sql(
        `CREATE TABLE IF NOT EXISTS "Users"(
          "UserName" VARCHAR(190) NOT NULL,
          "UserRole" VARCHAR(190) NULL,
          PRIMARY KEY("UserName")
        );`,
        true,
    );
}

export const handlers = app => {
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
};