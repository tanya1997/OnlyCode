import React from "react";
import { RouterProvider, Route, createHashRouter } from "react-router-dom";

import { Layout } from "./components/Layout";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { HistoryPage } from "./pages/HistoryPage";

const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: MainPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/admin",
        Component: AdminPage,
      },
      {
        path: "/history",
        Component: HistoryPage,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
