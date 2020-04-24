export interface IUser {
  uid: string;
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

export interface IAddTask {
  uid: string;
  task: ITask;
}
