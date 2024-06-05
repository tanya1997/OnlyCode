import fs from "fs";
import path from "path";

export const handlers = app => {
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
}