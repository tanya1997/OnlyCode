export const getIsLogin = ({ session }) => session.token != null;

export const getLoginForm = ({ loginForm }) => loginForm;

export const getMLStatus = ({ mlStatus }) => mlStatus;

export const getMLImages = ({ mlImages }) => mlImages;

export const getGender = ({ prompt: state }) => state.userInfo.gender;
export const getAge = ({ prompt: state }) => state.userInfo.age;
export const getWage = ({ prompt: state }) => state.userInfo.wage;
export const getCluster = ({ prompt: state }) => state.userInfo.cluster;
export const getBannerFormat = ({ prompt: state }) => state.banner.format;
export const getBannerType = ({ prompt: state }) => state.banner.type;
export const getBannerWidth = ({ prompt: state }) => state.banner.width;
export const getBannerHeight = ({ prompt: state }) => state.banner.height;
export const getPrompt = ({ prompt: state }) => state.prompt;
export const getProduct = ({ prompt: state }) => state.product;

export const getPromptRequest = ({ prompt: state }) => ({
  user_info: {
    gender: state.userInfo.gender.value,
    age: String(state.userInfo.age),
    wage: String(state.userInfo.wage),
    cluster: state.userInfo.cluster.value,
  },
  banner: {
    type: state.banner.format.value,
    banner_type: state.banner.type.value,
    width: String(state.banner.width),
    height: String(state.banner.height),
  },
  prompt: state.prompt,
  product: state.product.value,
});

export const getPromptTags = ({ prompt: state }) => [
  {
    type: "userInfo",
    label: "пол_" + state.userInfo.gender.label.toLowerCase(),
  },
  { type: "userInfo", label: "возраст_" + String(state.userInfo.age) },
  { type: "userInfo", label: "зп_x12_" + String(state.userInfo.wage) },
  {
    type: "userInfo",
    label:
      "клиент_" +
      state.userInfo.cluster.label.toLowerCase().replace(/\s/gi, "_"),
  },
  { type: "banner", label: state.banner.format.value },
  {
    type: "banner",
    label: "баннер_" + state.banner.type.value.toLocaleLowerCase(),
  },
  {
    type: "banner",
    label: String(state.banner.width) + "x" + String(state.banner.height),
  },
  { type: "none", label: "продукт_" + state.product.value.toLocaleLowerCase() },
];
