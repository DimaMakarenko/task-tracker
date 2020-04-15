import { ITask } from '../../types/store';

const ADD_TASK_ID = 'activeTaskId/ADD_TASK_ID';
const REMOVE_TASK_ID = 'activeTaskId/REMOVE_TASK_ID';

export const addActiveTaskId = (payload: ITask) => ({
  type: ADD_TASK_ID,
  payload,
});
export const removeActiveTask = () => ({
  type: REMOVE_TASK_ID,
});

const initialState: number | null = null;

export const activeTaskId = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TASK_ID:
      return payload;
    case REMOVE_TASK_ID:
      return null;
    default:
      return state;
  }
};
