// TODO. Удалить

// UNSAFE EXPEREMENTAL API FOR INTERNAL USE ONLY!

// Single query with SELECT statement and result set - no semicolon at end
// http://localhost:3000/direct-single-sql-query-exec?SELECT%20123

// Multiple queries separated by semicolon with semicolon at end - no result set
// http://localhost:3000/direct-multi-sql-query-exec?BEGIN%20IMMEDIATE;
// http://localhost:3000/direct-multi-sql-query-exec?SELECT%201/0;
// http://localhost:3000/direct-multi-sql-query-exec?ROLLBACK;

export const handlers = app => sql => {
    app.get("/direct-single-sql-query-exec", async (req, res) => {
        try {
            const result = JSON.stringify(
                await sql(decodeURIComponent(req.urlQuery)),
            );
            res.end(result);
        } catch (error) {
            res.end(`${error}`);
        }
    });

    app.get("/direct-multi-sql-query-exec", async (req, res) => {
        try {
            await sql(decodeURIComponent(req.urlQuery), true);
            res.end("DBMS NO-RESULT STATEMENT SUCCESS");
        } catch (error) {
            res.end(`${error}`);
        }
    });
}