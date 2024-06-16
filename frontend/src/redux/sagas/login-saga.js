import { select, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { getLoginForm } from "../selectors";
import { updateSession } from "../actions";

export function* loginSaga({ api, router }) {
  const { username, password } = yield select(getLoginForm);

  try {
    const session = yield call(api.login, { username, password });
    yield put(updateSession(session));
    yield call(router.navigate, "/");
  } catch (error) {
    toast.error(`${error}`);
  }
}
