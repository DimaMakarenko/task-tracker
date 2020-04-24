export interface IUser {
  uid: string;
}
export interface ITasks {
  tasks: ITask[];
  activeTask: ITask | null;
}
export interface ITask {
  id: number;
  title: string;
  project: string;
  duration: number;
  isActive: boolean;
  isFinished: boolean;
  startTimer: number;
  timeSession: { start: number; end?: number }[];
  tags?: string[];
  file?: any;
}

export interface INewTask {
  title: string;
  project: string;
}

// ACTIONS //

export interface ICreateTask {
  uid: string;
  task: ITask;
}

export interface IFetchTasks {
  uid: string;
}

export interface IUpdateTask {
  uid: string;
  taskId: string;
}
