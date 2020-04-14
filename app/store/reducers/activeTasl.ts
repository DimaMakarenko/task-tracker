import { ITask } from './tasks';

const ADD_TASK = 'activeTask/ADD_TASK';
const REMOVE_TASK = 'activeTask/REMOVE_TASK';

export const addActiveTask = (payload: ITask) => ({
  type: ADD_TASK,
  payload,
});
export const removeActiveTask = () => ({
  type: REMOVE_TASK,
});

const initialState: ITask | null = null;

export const activeTask = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return payload;
    case REMOVE_TASK:
      return null;
    default:
      return state;
  }
};
