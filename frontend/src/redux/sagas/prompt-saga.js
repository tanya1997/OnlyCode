import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { loadImagesRequest } from "../actions";

export function* promptSaga({ api }, { payload: { text } }) {
  try {
    const promptId = yield call(api.sendPrompt, { text });
    yield put(loadImagesRequest(promptId));
  } catch (error) {
    toast.error(`${error}`);
  }
}
