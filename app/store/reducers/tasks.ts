// const
const ADD_TASK = 'tasks/ADD_TASK';

//
interface ISession {
  start: number;
  end: number;
}

interface ITask {
  id: string;
  title: string;
  project: string;
  duration: number;
  isPaused: boolean;
  isDone: boolean;
  timeSession: ISession[];
  tags?: string[];
  file?: any;
}

// state
const initialState: ITask[] = [];

// actions
export const addTask = (payload: ITask) => ({ type: ADD_TASK, payload });

export const tasks = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return [...state, payload];
    default:
      return state;
  }
};
