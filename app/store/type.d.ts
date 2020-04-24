export interface IUser {
  uid: string;
}
export interface ITasks {
  tasks: ITask[];
  activeTask: ITask | null;
}
export type ISession = {
  start: number;
  end?: number;
};

export interface ITask {
  id: number;
  title: string;
  project: string;
  duration: number;
  isActive: boolean;
  isFinished: boolean;
  startTimer: number;
  timeSession: ISession[];
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
  task: ITask;
}
