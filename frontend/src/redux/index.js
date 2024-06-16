import { legacy_createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { reducer } from "./reducers";
import { saga } from "./sagas";
import { createApi } from "./api";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const createStore = ({ router }) => {
  const api = createApi();
  const sagaMiddleware = createSagaMiddleware();

  const store = legacy_createStore(
    reducer,
    {
      session: api.getSession(),
    },
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(saga, { api, router });

  return store;
};
