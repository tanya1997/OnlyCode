import React, { memo, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import { createStore } from "./redux";
import { createRouter } from "./router";

const router =  createRouter()
const store = createStore({ router })

const App = memo(() => (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
))

export default App;
