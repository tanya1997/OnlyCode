import { select, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import { getLoginForm } from "../selectors";

export function* loginSaga({ api, router }) {
  const { username, password } = yield select(getLoginForm);

  try {
    yield call(api.login, { username, password });
    yield call(router.navigate, "/");
  } catch (error) {
    toast.error(`${error}`);
  }
}
