import { types } from './types';

export const tableResize = (data) => {
  return {
    type: types.TABLE_RESIZE,
    payload: data,
  };
};

export const changeText = (text) => {
  return {
    type: types.TABLE_RESIZE,
    payload: text,
  };
};
