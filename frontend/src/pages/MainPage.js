import React, { useCallback, useState, memo } from "react";
import { Button, Box, ThumbsRating, TextArea } from "grommet";
import { useDispatch, useSelector } from "react-redux";

import { getIsLogin } from "../redux/selectors";
import { sendPrompt } from "../redux/actions";
import { LandingPage } from "./LandingPage";

const PromptPage = memo(() => {
  const [input, setInput] = useState("");
  const inputChangeHandler = useCallback(
    ({ target: { value } }) => setInput(value),
    [setInput],
  );

  const [imgSrc, setImgSrc] = useState("");

  const dispatch = useDispatch();
  const sendPromptToMl = useCallback(
    () => dispatch(sendPrompt(input)),
    [dispatch],
  );

  return (
    <Box align="center" justify="center" pad="small">
      <TextArea value={input} onChange={inputChangeHandler} />
      <Button
        primary
        label="Сделать хорошо"
        onClick={() => {
          sendPromptToMl();
          setImgSrc("https://www.personal-dom.ru/data/files/banner2.jpg");
        }}
      />
      <img src={imgSrc} />
      <Box align="center" justify="center" pad="small">
        <ThumbsRating id="thumb-rating" name="rating" />
      </Box>
    </Box>
  );
});

export const MainPage = memo(() => {
  const isLogin = useSelector(getIsLogin);

  if (isLogin) {
    return <PromptPage />;
  }

  return <LandingPage />;
});
