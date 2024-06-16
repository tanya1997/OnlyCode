import React, { useCallback } from "react";
import { Box, TextInput, Form, Button, FormField } from "grommet";
import { useDispatch, useSelector } from "react-redux";

import { getLoginForm } from "../redux/selectors";
import { updateUsername, updatePassword, login } from "../redux/actions";

export const LoginPage = () => {
  const { username, password } = useSelector(getLoginForm);
  const dispatch = useDispatch();

  const onChangeUsername = useCallback(
    (event) => dispatch(updateUsername(event.target.value)),
    [dispatch],
  );
  const onChangePassword = useCallback(
    (event) => dispatch(updatePassword(event.target.value)),
    [dispatch],
  );
  const onSubmit = useCallback(() => dispatch(login()), [dispatch]);

  return (
    <Box align="center" pad="large" margin="large" border={{ size: "medium" }}>
      <Form>
        <FormField name="username" label="Имя пользователя">
          <TextInput
            name="username"
            value={username}
            onChange={onChangeUsername}
          />
        </FormField>
        <FormField name="password" label="Пароль">
          <TextInput
            name="password"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
        </FormField>
        <Box direction="row" margin={{ top: "medium" }}>
          <Button
            primary
            label="Войти"
            onClick={onSubmit}
            margin={{ horizontal: "xsmall" }}
            type="submit"
          />
        </Box>
      </Form>
    </Box>
  );
};
