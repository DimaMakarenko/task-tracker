// const
const ADD_TASK = 'tasks/ADD_TASK';

//
interface ISession {
  start: number;
  end: number;
}

export interface ITask {
  id: string;
  title: string;
  project: string;
  duration: number;
  isPaused: boolean;
  isDone: boolean;
  timeSession?: ISession[];
  tags?: string[];
  file?: any;
}
const exampleTask = {
  id: 1,
  title: '',
  project: '',
  duration: 12,
  isPaused: true,
  isDone: false,
};
// state
const initialState: ITask[] = [exampleTask];

// actions
export const addTask = (payload: ITask) => ({ type: ADD_TASK, payload });

export const tasks = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return [payload, ...state];
    default:
      return state;
  }
};
