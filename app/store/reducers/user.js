import { createAction } from '../createAction';

const initialState = {
  userId: '',
};

// const
const SET_USER_ID = 'SET_USER_ID';
const REMOVE_USER_ID = 'REMOVE_USER_ID';

// action
export const setUserId = createAction(SET_USER_ID);
export const removeUserId = createAction(REMOVE_USER_ID);

// reducer
export const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_ID:
      return { ...state, userId: payload };
    case REMOVE_USER_ID:
      return { ...state, userId: '' };
    default:
      return state;
  }
};
