import { describe, test, expect, beforeEach } from '@jest/globals';
import { createStore } from './createStore';

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: ++state.count };
  }
  return state;
};

describe('createStore:', () => {
  let store;
  let handler;
  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });
  test('should return store object', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
  });
  test('should getState return object', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });
  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });
  test('should change state if action exists', () => {
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toBe(1);
  });
  test('should NOT change state if action not exists', () => {
    store.dispatch({ type: 'NO_EXISTING_ACTION' });
    expect(store.getState()).toEqual(initialState);
  });
  test('should call subscriber function', () => {
    store.subscribe(handler);
    store.dispatch({ type: 'ADD' });
    expect(handler).toBeCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(store.getState());
  });
  test('should NOT call subscriber after unsubscribe', () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();
    store.dispatch({ type: 'ADD' });
    expect(handler).not.toHaveBeenCalled();
  });
  test('should dispatch action in async mode', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' });
      }, 500);
      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});
