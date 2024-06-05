// TODO. Удалить

export const handlers = app => {
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
}