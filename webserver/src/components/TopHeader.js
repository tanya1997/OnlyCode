import React from "react";
import { Nav, Menu, Header, Box, ResponsiveContext } from "grommet";
import { useNavigate } from "react-router-dom";

import { TopHeaderLink } from "./TopHeaderLink";

export const TopHeader = () => {
  const navigate = useNavigate();

  return (
    <Header background="dark-1" pad="medium">
      <Box direction="row" align="center" gap="small">
        <TopHeaderLink to="/" label="OnlyCode" />
      </Box>
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" ? (
            <Menu
              label="Menu"
              items={[
                {
                  label: "Login",
                  onClick: () => navigate("/login"),
                },
                {
                  label: "Main",
                  onClick: () => navigate("/"),
                },
                {
                  label: "History",
                  onClick: () => navigate("/history"),
                },
                {
                  label: "Admin Panel",
                  onClick: () => navigate("/admin"),
                },
              ]}
            />
          ) : (
            <Nav direction="row">
              <TopHeaderLink to="/login" label="Login" />
              <TopHeaderLink to="/" label="Main" />
              <TopHeaderLink to="/history" label="History" />
              <TopHeaderLink to="/admin" label="Admin Panel" />
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};
