import { ITask, INewTask } from '../store/type';

export const updateTaskList = (taskList: ITask[], payload: any) => {
  return taskList.map((task) => {
    return task.id === payload.task.id ? { ...task, ...payload.task } : task;
  });
};

export const getNewTask = (props: INewTask): ITask => {
  const { title, project } = props;
  const dn = Date.now();
  return {
    id: dn,
    title: title,
    project: project,
    duration: 0,
    isActive: true,
    isFinished: false,
    startTimer: dn,
    timeSession: [{ start: dn }],
    tags: ['hi', 'bro'],
  };
};
