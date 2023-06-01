// actions.js

import { SET_P1, SET_P2, SET_P3 } from "./types";

export const setP1 = (p1) => {
  return {
    type: SET_P1,
    payload: p1,
  };
};

export const setP2 = (p2) => {
  return {
    type: SET_P2,
    payload: p2,
  };
};

export const setP3 = (p3) => {
  return {
    type: SET_P3,
    payload: p3,
  };
};
