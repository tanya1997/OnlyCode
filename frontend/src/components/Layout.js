import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grommet, Box, Grid } from "grommet";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TopHeader } from "./TopHeader";
import { getMLStatus } from "../redux/selectors";
import { LandingPage } from "../pages/LandingPage";

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
  const isMLServerAvailable = useSelector(getMLStatus);

  return (
    <Grommet theme={theme} full>
      <Box gridArea="header">
        <TopHeader />
      </Box>
      <Box gridArea="main" justify="center" align="center">
        {isMLServerAvailable ? <Outlet /> : <LandingPage />}
      </Box>
      <ToastContainer autoClose={2000} />
    </Grommet>
  );
};
// align="center"
