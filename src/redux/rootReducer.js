import { types } from './types';

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case types.TABLE_RESIZE:
      field = action.payload.type === 'column' ? 'colState' : 'rowState';
      return {
        ...state,
        [field]: updValue(state, field, action),
      };
    case types.CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.payload.value,
        [field]: updValue(state, field, action),
      };
    case types.CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.payload,
      };
    case types.APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.payload.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.payload.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.payload.value },
      };
    case types.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
}

function updValue(state, field, action) {
  const prevValue = state[field] || {};
  prevValue[action.payload.id] = action.payload.value;
  return prevValue;
}
