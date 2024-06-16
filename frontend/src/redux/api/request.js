import querystring from "query-string";

const REACT_APP_BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;
const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const REACT_APP_BACKEND_PROTOCOL = process.env.REACT_APP_BACKEND_PROTOCOL;

export const request = async ({ method, url, payload, headers }) => {
  if (url[0] !== "/") {
    throw new Error("urls must start with a leading slash");
  }
  const query =
    method === "GET" && Object.keys(payload).length !== 0
      ? `?${querystring.stringify(payload)}`
      : "";
  const response = await fetch(
    `${REACT_APP_BACKEND_PROTOCOL}://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}${url}${query}`,
    {
      method,
      body: method !== "GET" ? JSON.stringify(payload) : undefined,
      headers,
    },
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const json = await response.json();
  console.debug(`${url}`, { method, request: payload, response: json });
  return json;
};
