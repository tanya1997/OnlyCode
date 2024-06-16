import { call } from "redux-saga/effects";

export function* logoutSaga({ api, router }) {
  yield call(api.clearSession);
  yield call(router.navigate, "/");
}
