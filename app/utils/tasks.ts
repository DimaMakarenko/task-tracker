import { ITask, INewTask } from '../store/type';

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
    tags: [],
  };
};
