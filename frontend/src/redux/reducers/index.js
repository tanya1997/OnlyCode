import { combineReducers } from "redux";

import { session } from "./session";
import { loginForm } from "./login-form";
import { mlStatus } from "./ml-status";
import { mlImages } from "./ml-images";
import { prompt } from "./prompt";

export const reducer = combineReducers({
  session,
  loginForm,
  mlStatus,
  mlImages,
  prompt,
});
