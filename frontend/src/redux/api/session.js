import Cookies from "js-cookie";

export const getSession = () => {
  return {
    token: Cookies.get("token") ?? null,
    isAdmin: Cookies.get("isAdmin") ?? false,
    clientId: Cookies.get("clientId") ?? null,
  };
};

export const saveSession = ({ headers, token, isAdmin, clientId }) => {
  if (token == null) {
    return clearSession({ headers });
  }

  headers["Authorization"] = `Basic ${token}`;
  headers["X-Client-Id"] = clientId;
  Cookies.set("token", token);
  Cookies.set("isAdmin", isAdmin);
  Cookies.set("clientId", clientId);
};

export const clearSession = ({ headers }) => {
  delete headers["Authorization"];
  delete headers["X-Client-Id"];
  Cookies.remove("token");
  Cookies.remove("isAdmin");
  Cookies.remove("clientId");
};
