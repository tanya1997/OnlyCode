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
    getProduct, getPrompt,
} from "../redux/selectors";
import {sendPrompt, updateProduct, updatePrompt} from "../redux/actions";
import { products } from "../constants";
import { BannerSettingsModal } from "../components/BannerSettingsModal";
import { UserDetailsModal } from "../components/UserDetailsModal";
import { MultilineInputWithTags } from "../components/MultilineInputWithTags";

export const PromptPage = memo(() => {
    const dispatch = useDispatch();

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
  
    const prompt = useSelector(getPrompt);
    const onPromptChange = useCallback(
      ({ target: { value } }) => dispatch(updatePrompt(value)),
      [dispatch, updatePrompt],
    );
  
    const mlImages = useSelector(getMLImages);

    const sendPromptToMl = useCallback(
      () => dispatch(sendPrompt(prompt)),
      [dispatch,prompt],
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
          value={prompt}
          tags={promptTags}
          onChange={onPromptChange}
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