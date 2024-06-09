import React, { useCallback } from "react";
import { Nav, Menu, Header, Box, ResponsiveContext } from "grommet";
import {
  Menu as MenuIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  History as HistoryIcon,
  Group as UsersIcon,
} from "grommet-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { TopHeaderLink } from "./TopHeaderLink";
import { logout } from "../redux/actions";
import { getIsLogin, getMLStatus } from "../redux/selectors";

export const TopHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(getIsLogin);
  const isMLServerAvailable = useSelector(getMLStatus);

  const onLogout = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(logout());
    },
    [dispatch],
  );

  return (
    <Header background="dark-1" pad="medium">
      <Box direction="row" align="center" gap="small">
        <TopHeaderLink to="/" label="OnlyCode" />
      </Box>
      {isMLServerAvailable && (
        <ResponsiveContext.Consumer>
          {(responsive) =>
            responsive === "small" ? (
              <Menu
                icon={<MenuIcon />}
                // label="Menu"
                items={[
                  {
                    icon: <LoginIcon />,
                    label: " Выйти",
                    onClick: onLogout,
                  },
                  {
                    icon: <LoginIcon />,
                    label: " История запросов",
                    onClick: () => navigate("/history"),
                  },
                  {
                    icon: <UsersIcon />,
                    label: " Пользователи",
                    onClick: () => navigate("/users"),
                  },
                ]}
              />
            ) : (
              <Nav direction="row">
                {isLogin ? (
                  <>
                    <TopHeaderLink
                      onClick={onLogout}
                      icon={<LoginIcon />}
                      label="Выйти"
                    />
                    <TopHeaderLink
                      to="/history"
                      icon={<HistoryIcon />}
                      label="История запросов"
                    />
                    <TopHeaderLink
                      to="/users"
                      icon={<UsersIcon />}
                      label="Пользователи"
                    />
                  </>
                ) : (
                  <TopHeaderLink
                    to="/login"
                    icon={<LoginIcon />}
                    label="Войти"
                  />
                )}
              </Nav>
            )
          }
        </ResponsiveContext.Consumer>
      )}
    </Header>
  );
};
