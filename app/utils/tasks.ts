import { ITask, INewTask } from '../store/type';

export const getNewTask = (task: INewTask, fileUrl: string): ITask => {
  const { title, project, tags } = task;
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
    tags: tags,
    file: fileUrl,
  };
};
