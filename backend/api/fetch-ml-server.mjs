import fetch from "node-fetch";

import { ML_BASE_URL } from "./constants.mjs";

export const fetchMlServer = async ({ method, url, body, baseUrl }) => {
  if (url[0] !== "/") {
    throw new Error("urls must start with a leading slash");
  }
  console.log(`${baseUrl ?? ML_BASE_URL}${url}`, { method, body });
  const response = await fetch(`${baseUrl ?? ML_BASE_URL}${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const text = await response.text();
  console.log("!!!!", text);
  const json = JSON.parse(text);
  return json;
};
