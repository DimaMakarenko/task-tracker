import { ITask } from '../types/store';
interface INewTaskProps {
  title: string;
  project: string;
}

export const newTask = (props: INewTaskProps): ITask => {
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
  };
};
