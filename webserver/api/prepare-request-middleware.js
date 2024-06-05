import * as cookie from "cookie";
import * as mimeTypes from "mime-types";
import * as getRawBody from "raw-body";
import url from "url";

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


export const prepareRequestMiddleware = async (req, res, next) => {
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
}