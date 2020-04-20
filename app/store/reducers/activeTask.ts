import { IActiveTask } from '../../types/store';

const ADD_ACTIVE_TASK = 'activeTaskId/ADD_ACTIVE_TASK';
const REMOVE_ACTIVE_TASK = 'activeTaskId/REMOVE_ACTIVE_TASK';

export const addActiveTask = (payload: IActiveTask) => ({
  type: ADD_ACTIVE_TASK,
  payload,
});
export const removeActiveTask = () => ({
  type: REMOVE_ACTIVE_TASK,
});

const initialState: IActiveTask = {
  id: null,
  title: '',
  startTimer: null,
};

export const activeTask = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ACTIVE_TASK:
      return {
        id: payload.id,
        title: payload.title,
        startTimer: payload.startTimer,
      };
    case REMOVE_ACTIVE_TASK:
      return initialState;
    default:
      return state;
  }
};
