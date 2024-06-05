import {fetchMlServer} from "../fetch-ml-server";

export const handlers = app => {
    app.get("/ml", async (req, res) => {
        try {
            const response = await fetchMlServer({
                method: "POST",
                url: "/",
                body: "Потребительский кредит под залог недвижимости со ставкой 17 процентов",
            });
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
    });

    app.get("/ml2", async (req, res) => {
        try {
            const response = await fetchMlServer({
                method: "GET",
                url: "/",
            });
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
    });

    app.get("/ml3", async (req, res) => {
        try {
            const response = await fetchMlServer({
                method: "POST",
                url: "/",
                body: "Потребительский кредит под залог недвижимости со ставкой 17 процентов",
                baseUrl: "http://5.35.11.130:3002",
            });
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
    });

    app.get("/ml4", async (req, res) => {
        try {
            const response = await fetchMlServer({
                method: "GET",
                url: "/",
                baseUrl: "http://5.35.11.130:3002",
            });
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.end();
        }
    });
}