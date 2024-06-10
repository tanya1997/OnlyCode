import React, { useCallback } from "react";
import { Menu, Header, Box } from "grommet";
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
      <Menu
        disabled={!isMLServerAvailable}
        icon={<MenuIcon />}
        items={
          isLogin
            ? [
                {
                  icon: <LogoutIcon />,
                  label: "Выйти",
                  onClick: onLogout,
                  gap: "small",
                },
                {
                  icon: <HistoryIcon />,
                  label: "История запросов",
                  onClick: () => navigate("/history"),
                  gap: "small",
                },
                {
                  icon: <UsersIcon />,
                  label: "Пользователи",
                  onClick: () => navigate("/users"),
                  gap: "small",
                },
              ]
            : [
                {
                  icon: <LoginIcon />,
                  label: "Войти",
                  onClick: () => navigate("/login"),
                  gap: "small",
                },
              ]
        }
      />
    </Header>
  );
};
