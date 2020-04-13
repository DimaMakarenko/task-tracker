import { createAction } from '../createAction';
// const
const ADD_TASK = 'tasks/ADD_TASK';

// state
const initialState: object[] = [];

// actions
export const addTask = createAction(ADD_TASK);

export const tasks = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return [...state, payload];
    default:
      return state;
  }
};
