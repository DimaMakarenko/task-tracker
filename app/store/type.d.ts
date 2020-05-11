// user
export interface IUser {
  uid: string;
}

// tag

export type ITag = string[];
export type ITagFunc = (title: string) => void;

// task
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
  tags?: ITag;
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
  task: ITask;
  uid: string;
}

export interface IDeleteTask {
  taskId: number;
  uid: string;
}

export interface IFilterTask {
  uid: string;
  filterTags: ITag;
  ref: string;
}

export type TFakeTask = { [key: number]: ITask };

interface IGenerateTasks {
  uid: string;
  tasks: TFakeTask;
}
