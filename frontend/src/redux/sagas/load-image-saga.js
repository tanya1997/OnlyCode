import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { loadImagesSuccess } from "../actions";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const STEP_DELAY = 10000;
const DELAY_TIMEOUT = 60000 * 3;

export function* loadImageSaga({ api }, { payload: { promptId } }) {
  try {
    for (let retry = 0; retry < DELAY_TIMEOUT / STEP_DELAY; retry++) {
      const images = yield call(api.loadImage, promptId);
      if (images.length > 0) {
        yield put(loadImagesSuccess(promptId, images));
        break;
      }
      yield call(delay, STEP_DELAY);
    }
  } catch (error) {
    toast.error(`${error}`);
  }
}
