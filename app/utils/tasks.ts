import { ITask } from '../store/type';

type INewTaskProps = {
  title: string;
  project: string;
};

export const updateTaskList = (taskList: ITask[], payload) => {
  return taskList.map((task) => {
    return task.id === payload.task.id ? { ...task, ...payload.task } : task;
  });
};

export const getNewTask = (props: INewTaskProps): ITask => {
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
  };
};
