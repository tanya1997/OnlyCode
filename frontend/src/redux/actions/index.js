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

export const loadImagesRequest = (promptId) => ({
  type: ActionTypes.LOAD_IMAGES_REQUEST,
  payload: { promptId },
});

export const loadImagesSuccess = (promptId, images) => ({
  type: ActionTypes.LOAD_IMAGES_SUCCESS,
  payload: { promptId, images },
});

export const updatePrompt = (prompt) => ({
  type: ActionTypes.UPDATE_PROMPT,
  payload: { prompt },
});

export const updateProduct = (product) => ({
  type: ActionTypes.UPDATE_PRODUCT,
  payload: { product },
});

export const updateBannerFormat = (format) => ({
  type: ActionTypes.UPDATE_BANNER_FORMAT,
  payload: { format },
});

export const updateBannerType = (type) => ({
  type: ActionTypes.UPDATE_BANNER_TYPE,
  payload: { type },
});

export const updateBannerWidth = (width) => ({
  type: ActionTypes.UPDATE_BANNER_WIDTH,
  payload: { width },
});

export const updateBannerHeight = (height) => ({
  type: ActionTypes.UPDATE_BANNER_HEIGHT,
  payload: { height },
});

export const updateGender = (gender) => ({
  type: ActionTypes.UPDATE_GENDER,
  payload: { gender },
});

export const updateAge = (age) => ({
  type: ActionTypes.UPDATE_AGE,
  payload: { age },
});

export const updateWage = (wage) => ({
  type: ActionTypes.UPDATE_WAGE,
  payload: { wage },
});

export const updateCluster = (cluster) => ({
  type: ActionTypes.UPDATE_CLUSTER,
  payload: { cluster },
});
