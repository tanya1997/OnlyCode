import { takeEvery, fork } from "redux-saga/effects";

import { ActionTypes } from "../actions";
import { loginSaga } from "./login-saga";
import { logoutSaga } from "./logout-saga";
import { mlServerSaga } from "./ml-server-saga";

export function* saga(context) {
  yield takeEvery(ActionTypes.LOGOUT, logoutSaga, context);
  yield takeEvery(ActionTypes.LOGIN, loginSaga, context);
  yield fork(mlServerSaga, context);
}
