import { call, put, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { loadImagesRequest } from "../actions";
import {getPromptRequest} from "../selectors";

export function* promptSaga({ api }, { payload: { text } }) {
  try {
    const prompt = yield select(getPromptRequest)
    console.log(prompt)
    const promptId = yield call(api.sendPrompt, prompt);
    yield put(loadImagesRequest(promptId));
  } catch (error) {
    toast.error(`${error}`);
  }
}
