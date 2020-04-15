//types
import { ITask } from '../../types/store';

// const
const ADD_TASK = 'tasks/ADD_TASK';

// state
const exampleTask: ITask = {
  id: Date.now(),
  title: '',
  project: '',
  duration: 0,
  timerStart: Date.now(),
  isPaused: true,
  isDone: false,
};
const initialState: ITask[] = [exampleTask];

// actions
export const addTask = (payload: ITask) => ({ type: ADD_TASK, payload });

export const tasks = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TASK:
      return [payload, ...state];
    default:
      return state;
  }
};
