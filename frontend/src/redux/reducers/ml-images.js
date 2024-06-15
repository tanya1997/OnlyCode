import { ActionTypes } from "../actions";

const initialState = [];

export const mlImages = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_IMAGES_REQUEST: {
      return initialState;
    }
    case ActionTypes.LOAD_IMAGES_SUCCESS: {
      return action.payload.images;
    }
    default: {
      return state;
    }
  }
};
