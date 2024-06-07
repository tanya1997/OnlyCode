import { deleteCookie, setCookie, getCookie } from "./cookies";

export const getSession = () => {
  return {
    token: getCookie("token"),
    isAdmin: getCookie("isAdmin"),
  };
};

export const saveSession = ({ headers, token, isAdmin }) => {
  if (token == null) {
    return clearSession(headers);
  }

  headers["Authorization"] = `Basic ${token}`;
  setCookie("token", token);
  setCookie("isAdmin", isAdmin);
};

export const clearSession = ({ headers }) => {
  delete headers["Authorization"];
  deleteCookie("token");
  deleteCookie("isAdmin");
};
