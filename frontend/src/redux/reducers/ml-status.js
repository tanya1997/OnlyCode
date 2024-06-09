import { ActionTypes } from "../actions";

const initialState = false

export const mlStatus = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STOP_ML_SERVER: {
      return false;
    }
    case ActionTypes.UPDATE_ML_SERVER_STATUS: {
      return action.payload.status;
    }
    default: {
      return state;
    }
  }
};