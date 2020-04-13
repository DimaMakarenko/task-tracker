import { createAction } from '../createAction';

// const
const SET_USER_ID = 'user/SET_USER_ID';
const REMOVE_USER_ID = 'user/REMOVE_USER_ID';

// interfaces
interface IInititaState {
  userId: string;
}

// state
const initialState: IInititaState = {
  userId: '',
};

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
