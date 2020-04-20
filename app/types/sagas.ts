import { DELETE_TASK, CREATE_TASK, PAUSE_TASK } from '../store/reducers/tasks';

export interface IDeleteTask {
  type: typeof DELETE_TASK;
  payload: number;
}

export interface ICreateTask {
  type: typeof CREATE_TASK;
  payload: {
    title: string;
    project: string;
  };
}

export interface IPauseTask {
  type: typeof PAUSE_TASK;
  payload: number;
}
