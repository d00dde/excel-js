import { types } from './types';

export function rootReducer(state, action) {
  let prevState;
  let field;
  switch (action.type) {
    case types.TABLE_RESIZE:
      field = action.payload.type === 'column' ? 'colState': 'rowState';
      prevState = state[field] || {};
      prevState[action.payload.id] = action.payload.value;
      return {
        ...state,
        [field]: prevState,
      };
    default:
      return state;
  }
}
