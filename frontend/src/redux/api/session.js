import Cookies from "js-cookie";

export const getSession = () => {
  return {
    token: Cookies.get("token") ?? null,
    isAdmin: Cookies.get("isAdmin") ?? false,
  };
};

export const saveSession = ({ headers, token, isAdmin }) => {
  if (token == null) {
    return clearSession({ headers });
  }

  headers["Authorization"] = `Basic ${token}`;
  Cookies.set("token", token);
  Cookies.set("isAdmin", isAdmin);
};

export const clearSession = ({ headers }) => {
  delete headers["Authorization"];
  Cookies.remove("token");
  Cookies.remove("isAdmin");
};
