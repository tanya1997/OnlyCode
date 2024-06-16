import { ActionTypes } from "../actions";

const initialState = {
  username: "admin",
  password: "admin",
};

export const loginForm = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USERNAME: {
      return {
        ...state,
        username: action.payload.username,
      };
    }
    case ActionTypes.UPDATE_PASSWORD: {
      return {
        ...state,
        password: action.payload.password,
      };
    }
    default: {
      return state;
    }
  }
};
