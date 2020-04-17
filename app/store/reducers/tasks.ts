//types
import { ITask } from '../../types/store';

// const
const ADD_TASK = 'tasks/ADD_TASK';
export const FETCH_TASKS = 'tasks/FETCH_TASKS';
export const ADD_TASKS = 'tasks/ADD_TASKS';

// state
const initialState: ITask[] = [];

// actions
export const addTask = (payload: ITask) => ({ type: ADD_TASK, payload });
export const addTasks = (payload: ITask[]) => ({ type: ADD_TASKS, payload });
export const fetchTasks = () => ({ type: FETCH_TASKS });

export const tasks = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TASKS:
      return payload;
    case ADD_TASK:
      return [payload, ...state];
    default:
      return state;
  }
};
