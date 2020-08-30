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
export const changeStyles = (value) => {
  return {
    type: types.CHANGE_STYLES,
    payload: value,
  };
};
export const applyStyle = (value) => {
  return {
    type: types.APPLY_STYLE,
    payload: value,
  };
};
export const changeTitle = (title) => {
  return {
    type: types.CHANGE_TITLE,
    payload: title,
  };
};
