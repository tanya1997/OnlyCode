import React, { useCallback, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  ThumbsRating,
  TextArea,
  Text,
  Select,
  Image,
} from "grommet";
import {
  User as UserIcon,
  SettingsOption as SettingsOptionIcon,
} from "grommet-icons";

import { LandingPage } from "./LandingPage";
import { getIsLogin, getMLImages } from "../redux/selectors";
import { sendPrompt } from "../redux/actions";
import { ages, clusters, genders, products } from "../constants";
import { BannerSettingsModal } from "../components/BannerSettingsModal";
import { UserDetailsModal } from "../components/UserDetailsModal";

const PromptPage = memo(() => {
  const [isUserDetailsModalOpened, setIsUserDetailsModalOpened] =
    React.useState(false);
  const onUserDetailsModalOpen = useCallback(
    () => setIsUserDetailsModalOpened(true),
    [setIsUserDetailsModalOpened],
  );
  const onUserDetailsCancel = useCallback(
    () => setIsUserDetailsModalOpened(false),
    [setIsUserDetailsModalOpened],
  );
  const onUserDetailsSuccess = useCallback(() => {
    setIsUserDetailsModalOpened(false);
  }, [setIsUserDetailsModalOpened]);

  const [isBannerSettingsModalOpened, setIsBannerSettingsModalOpened] =
    React.useState(false);
  const onBannerSettingsModalOpen = useCallback(
    () => setIsBannerSettingsModalOpened(true),
    [setIsBannerSettingsModalOpened],
  );
  const onBannerSettingsCancel = useCallback(
    () => setIsBannerSettingsModalOpened(false),
    [setIsBannerSettingsModalOpened],
  );
  const onBannerSettingsSuccess = useCallback(() => {
    setIsBannerSettingsModalOpened(false);
  }, [setIsBannerSettingsModalOpened]);

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

  const [product, setProduct] = React.useState("");
  const onProductChange = useCallback(
    ({ option }) => setProduct(option),
    [setProduct],
  );

  const initialGender = genders[0];
  const [gender, setGender] = useState(initialGender);
  const onGenderChange = useCallback(
    ({ option }) => setGender(option),
    [setGender],
  );

  const initialAge = ages[0];
  const [age, setAge] = useState(initialAge);
  const onAgeChange = useCallback(({ option }) => setAge(option), [setAge]);

  const initialWage = "480000";
  const [wage, setWage] = React.useState(initialWage);
  const onWageChange = useCallback(
    (event) => setWage(event.target.value),
    [setWage],
  );

  const initialCluster = React.useState(clusters[2]);
  const [cluster, setCluster] = React.useState(initialCluster);
  const onClusterChange = useCallback(
    ({ option }) => setCluster(option),
    [setCluster],
  );

  const [bannerWidth, setBannerWidth] = useState(512);
  const onBannerWidthChange = useCallback(
    (event) => setBannerWidth(event.target.value),
    [setBannerWidth],
  );

  const [bannerHeight, setBannerHeight] = useState(512);
  const onBannerHeightChange = useCallback(
    (event) => setBannerHeight(event.target.value),
    [setBannerHeight],
  );

  const isSubmitButtonDisabled = product === "";

  return (
    <Box align="center" justify="center" pad="small" gap="small">
      <Box fill align="center" justify="center" direction="row" gap="small">
        <Select
          placeholder="Продукт"
          // required
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

      <TextArea value={input} onChange={inputChangeHandler} />
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
        onSuccess={onUserDetailsSuccess}
        onCancel={onUserDetailsCancel}
        gender={gender}
        onGenderChange={onGenderChange}
        age={age}
        onAgeChange={onAgeChange}
        wage={wage}
        onWageChange={onWageChange}
        cluster={cluster}
        onClusterChange={onClusterChange}
      />
      <BannerSettingsModal
        isOpened={isBannerSettingsModalOpened}
        onSuccess={onBannerSettingsSuccess}
        onCancel={onBannerSettingsCancel}
        bannerWidth={bannerWidth}
        onBannerWidthChange={onBannerWidthChange}
        bannerHeight={bannerHeight}
        onBannerHeightChange={onBannerHeightChange}
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
