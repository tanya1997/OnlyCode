import React, { useCallback, useState, memo } from "react";
import { Button, Box, ThumbsRating, TextArea } from "grommet";

export const MainPage = memo(() => {
  const [input, setInput] = useState("");
  const inputChangeHandler = useCallback(
    ({ target: { value } }) => setInput(value),
    [setInput],
  );

  const [imgSrc, setImgSrc] = useState("");

  return (
    <Box align="center" justify="center" pad="small">
      <TextArea value={input} onChange={inputChangeHandler} />
      <Button
        primary
        label="Make good"
        onClick={() => {
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
