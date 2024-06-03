import React from "react";
import { Outlet } from "react-router-dom";
import { Grommet } from "grommet";

import { TopHeader } from "./TopHeader";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

export const Layout = () => {
  return (
    <Grommet theme={theme} full>
      <TopHeader />
      <Outlet />
    </Grommet>
  );
};
