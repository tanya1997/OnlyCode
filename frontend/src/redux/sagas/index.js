import { takeEvery, fork } from "redux-saga/effects";

import { ActionTypes } from "../actions";
import { loginSaga } from "./login-saga";
import { logoutSaga } from "./logout-saga";
import { mlServerSaga } from "./ml-server-saga";
import { promptSaga } from "./prompt-saga";
import { loadImageSaga } from "./load-image-saga";

export function* saga(context) {
  yield takeEvery(ActionTypes.LOGOUT, logoutSaga, context);
  yield takeEvery(ActionTypes.LOGIN, loginSaga, context);
  yield takeEvery(ActionTypes.SEND_PROMPT, promptSaga, context);
  yield takeEvery(ActionTypes.LOAD_IMAGES_REQUEST, loadImageSaga, context);
  yield fork(mlServerSaga, context);
}
