import { call, takeEvery, put, fork } from "redux-saga/effects";

import { ActionTypes, updateMLStatus, requestMLStatus } from "../actions";
import { toast } from "react-toastify";

function* mlServerStartSaga({ api }) {
  try {
    yield call(api.startML);
  } catch (error) {
    toast.error(`${error}`);
  }
}

function* mlServerStopSaga({ api }) {
  try {
    yield call(api.stopML);
  } catch (error) {
    toast.error(`${error}`);
  }
}

function* mlServerStatusSaga({ api }) {
  try {
    const status = yield call(api.statusML);

    yield put(updateMLStatus(status));
  } catch (error) {
    toast.error(`${error}`);
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* mlServerStatusByInterval() {
  yield call(delay, 1000);
  while (true) {
    yield put(requestMLStatus());
    yield call(delay, 15000);
  }
}

export function* mlServerSaga(context) {
  yield takeEvery(ActionTypes.START_ML_SERVER, mlServerStartSaga, context);
  yield takeEvery(ActionTypes.STOP_ML_SERVER, mlServerStopSaga, context);
  yield takeEvery(
    ActionTypes.REQUEST_ML_SERVER_STATUS,
    mlServerStatusSaga,
    context,
  );
  yield fork(mlServerStatusByInterval, context);
}
