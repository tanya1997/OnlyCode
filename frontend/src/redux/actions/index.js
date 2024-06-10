import * as ActionTypes from "./action-types";
export * as ActionTypes from "./action-types";

export const logout = () => ({
  type: ActionTypes.LOGOUT,
  payload: {},
});

export const login = () => ({
  type: ActionTypes.LOGIN,
  payload: {},
});

export const updateUsername = (username) => ({
  type: ActionTypes.UPDATE_USERNAME,
  payload: { username },
});

export const updatePassword = (password) => ({
  type: ActionTypes.UPDATE_PASSWORD,
  payload: { password },
});

export const updateSession = (session) => ({
  type: ActionTypes.UPDATE_SESSION,
  payload: { session },
});

export const updateMLStatus = (status) => ({
  type: ActionTypes.UPDATE_ML_SERVER_STATUS,
  payload: { status },
});

export const requestMLStatus = () => ({
  type: ActionTypes.REQUEST_ML_SERVER_STATUS,
  payload: {},
});

export const startMLServer = () => ({
  type: ActionTypes.START_ML_SERVER,
  payload: {},
});

export const stopMLServer = () => ({
  type: ActionTypes.STOP_ML_SERVER,
  payload: {},
});

export const sendPrompt = (text) => ({
  type: ActionTypes.SEND_PROMPT,
  payload: { text },
});
