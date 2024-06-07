import querystring from "query-string";

export const request = async ({ method, url, payload, headers }) => {
  if (url[0] !== "/") {
    throw new Error("urls must start with a leading slash");
  }
  const query =
    method === "GET" && Object.keys(payload).length !== 0
      ? `?${querystring.stringify(payload)}`
      : "";
  const response = await fetch(`${url}${query}`, {
    method,
    body: method !== "GET" ? payload : undefined,
    headers,
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const json = await response.json();
  console.log(`${url}`, { method, request: payload, response: json });
  return json;
};
