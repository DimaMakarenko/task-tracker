//types
import { ITask, INewTask } from '../../types/store';

// const
const ADD_TASK = 'tasks/ADD_TASK';
export const FETCH_TASKS = 'tasks/FETCH_TASKS';
export const CREATE_TASK = 'tasks/CREATE_TASK';
export const DELETE_TASKS = 'tasks/DELETE_TASKS';
export const DELETE_TASK = 'tasks/DELETE_TASK';
export const PAUSE_TASK = 'tasks/PAUSE_TASK';
// state
const initialState: ITask[] = [];

// actions
export const addTask = (payload: ITask) => ({ type: ADD_TASK, payload });
export const fetchTasks = () => ({ type: FETCH_TASKS });
export const createTask = (payload: INewTask) => ({ type: CREATE_TASK, payload });
export const deleteTasks = () => ({ type: DELETE_TASKS });
export const deleteTask = (payload: number) => ({ type: DELETE_TASK, payload });
export const pauseTask = (payload: number) => ({ type: PAUSE_TASK, payload });

export const tasks = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TASK:
      return [payload, ...state];
    case DELETE_TASKS:
      return initialState;
    default:
      return state;
  }
};
