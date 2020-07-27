import { types } from './types';

export function rootReducer(state, action) {
  let prevState;
  switch (action.type) {
    case types.TABLE_RESIZE:
      prevState = state.colState || {};
      prevState[action.payload.id] = action.payload.value;
      return {
        ...state,
        colState: prevState,
      };
    default:
      return state;
  }
}
