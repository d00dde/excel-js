import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentText: '',
  currentStyles: defaultStyles,
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : JSON.parse(JSON.stringify(defaultState));
}
