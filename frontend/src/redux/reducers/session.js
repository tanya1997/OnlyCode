import { ActionTypes } from "../actions";

const initialState = {
  token: null,
  isAdmin: false,
};

export const session = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGOUT: {
      return initialState;
    }
    case ActionTypes.UPDATE_SESSION: {
      return action.payload.session;
    }
  }
  return state;
};
