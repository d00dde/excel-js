import { types } from './types';

export const tableResize = (data) => {
	return {
    type: types.TABLE_RESIZE, 
    payload: data,
  };
}