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
import {PromptPage} from "./PromptPage"


export const MainPage = memo(() => {
  return <LandingPage />;
});
