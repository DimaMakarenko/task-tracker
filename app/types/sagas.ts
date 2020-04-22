import { DELETE_TASK, CREATE_TASK, PAUSE_TASK, UPDATE_TASK } from '../store/reducers/tasks';
import { INewTask } from './store';

export interface IDeleteTask {
  type: typeof DELETE_TASK;
  payload: number;
}

export interface ICreateTask {
  type: typeof CREATE_TASK;
  payload: INewTask;
}

export interface IPauseTask {
  type: typeof PAUSE_TASK;
  payload: number;
}

type TUpdateTask = {
  id: number;
  task: INewTask;
};

export interface IUpdateTask {
  type: typeof UPDATE_TASK;
  payload: TUpdateTask;
}
