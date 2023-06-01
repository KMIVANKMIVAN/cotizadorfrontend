// reducer.js

import { SET_P1, SET_P2, SET_P3 } from "./types";

const initialState = {
  p1: null,
  p2: null,
  p3: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_P1:
      return {
        ...state,
        p1: action.payload,
      };
    case SET_P2:
      return {
        ...state,
        p2: action.payload,
      };
    case SET_P3:
      return {
        ...state,
        p3: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
