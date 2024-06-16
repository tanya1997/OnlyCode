import { createHashRouter } from "react-router-dom";

import { Layout } from "../components/Layout";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { AdminPage } from "../pages/AdminPage";
import { HistoryPage } from "../pages/HistoryPage";

export const createRouter = () =>
  createHashRouter([
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
          path: "/users",
          Component: AdminPage,
        },
        {
          path: "/history",
          Component: HistoryPage,
        },
      ],
    },
  ]);
