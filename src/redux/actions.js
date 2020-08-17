import { types } from './types';

export const tableResize = (data) => {
  return {
    type: types.TABLE_RESIZE,
    payload: data,
  };
};

export const changeText = (value) => {
  return {
    type: types.CHANGE_TEXT,
    payload: value,
  };
};
