import { call } from "redux-saga/effects";
import { toast } from "react-toastify";

export function* promptSaga({ api }, { payload: { text } }) {
  try {
    yield call(api.sendPrompt, { text });
  } catch (error) {
    toast.error(`${error}`);
  }
}
