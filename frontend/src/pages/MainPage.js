import React, { useCallback, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, ThumbsRating, Text, Select, Image } from "grommet";
import {
  User as UserIcon,
  SettingsOption as SettingsOptionIcon,
} from "grommet-icons";

import { LandingPage } from "./LandingPage";
import {
  getIsLogin,
  getMLImages,
  getPromptTags,
  getProduct,
} from "../redux/selectors";
import { sendPrompt, updateProduct } from "../redux/actions";
import { products } from "../constants";
import { BannerSettingsModal } from "../components/BannerSettingsModal";
import { UserDetailsModal } from "../components/UserDetailsModal";
import { MultilineInputWithTags } from "../components/MultilineInputWithTags";

const PromptPage = memo(() => {
  const [isUserDetailsModalOpened, setIsUserDetailsModalOpened] =
    React.useState(false);
  const onUserDetailsModalOpen = useCallback(
    () => setIsUserDetailsModalOpened(true),
    [setIsUserDetailsModalOpened],
  );
  const onUserDetailsClose = useCallback(() => {
    setIsUserDetailsModalOpened(false);
  }, [setIsUserDetailsModalOpened]);

  const [isBannerSettingsModalOpened, setIsBannerSettingsModalOpened] =
    React.useState(false);
  const onBannerSettingsModalOpen = useCallback(
    () => setIsBannerSettingsModalOpened(true),
    [setIsBannerSettingsModalOpened],
  );
  const onBannerSettingsClose = useCallback(() => {
    setIsBannerSettingsModalOpened(false);
  }, [setIsBannerSettingsModalOpened]);

  const promptTags = useSelector(getPromptTags);

  const [input, setInput] = useState("");
  const inputChangeHandler = useCallback(
    ({ target: { value } }) => setInput(value),
    [setInput],
  );

  const mlImages = useSelector(getMLImages);

  const dispatch = useDispatch();
  const sendPromptToMl = useCallback(
    () => dispatch(sendPrompt(input)),
    [dispatch],
  );

  const product = useSelector(getProduct);
  const onProductChange = useCallback(
    ({ option }) => dispatch(updateProduct(option)),
    [dispatch, updateProduct],
  );

  const openModalByTagType = useCallback(
    (type) =>
      type === "banner"
        ? onBannerSettingsModalOpen()
        : type === "userInfo"
          ? onUserDetailsModalOpen()
          : null,
    [onUserDetailsModalOpen, onBannerSettingsModalOpen],
  );

  const isSubmitButtonDisabled = product === "";

  return (
    <Box align="center" justify="center" pad="small" gap="small">
      <Box fill align="center" justify="center" direction="row" gap="small">
        <Select
          placeholder="Продукт"
          value={product}
          options={products}
          onChange={onProductChange}
        />
        <Button
          icon={<UserIcon />}
          label={
            <Text>
              <strong>Информация о клиенте</strong>
            </Text>
          }
          onClick={onUserDetailsModalOpen}
          plain
        />
        <Button
          icon={<SettingsOptionIcon />}
          label={
            <Text>
              <strong>Настройка банера</strong>
            </Text>
          }
          onClick={onBannerSettingsModalOpen}
          plain
        />
      </Box>
      <MultilineInputWithTags
        value={input}
        tags={promptTags}
        onChange={inputChangeHandler}
        onTagClick={openModalByTagType}
      />
      <Button
        primary
        label="Сделать хорошо"
        onClick={() => {
          sendPromptToMl();
        }}
        disabled={isSubmitButtonDisabled}
      />

      {mlImages.map((imgSrc, index) => (
        <Box
          align="center"
          justify="center"
          pad="small"
          gap="small"
          key={index}
        >
          <Image src={imgSrc} />
          <ThumbsRating id="thumb-rating" name="rating" />
        </Box>
      ))}

      <UserDetailsModal
        isOpened={isUserDetailsModalOpened}
        onClose={onUserDetailsClose}
      />
      <BannerSettingsModal
        isOpened={isBannerSettingsModalOpened}
        onClose={onBannerSettingsClose}
      />
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
