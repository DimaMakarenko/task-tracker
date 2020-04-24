import { useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { fetchTasksAction, createTaskAction, pauseTaskAction } from '../store/reducers/tasks/actions';
import { addActiveTaskAction } from '../store/reducers/tasks/tasks';
// types
import { ICreateTask, IFetchTasks, ITask, IUpdateTask, ISession } from '../store/type';

export const useTaskAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const loader = (action: Function) => {
    return () => {
      setIsLoading(true);
      action();
      setIsLoading(false);
    };
  };

  const fetchTasks = (options: IFetchTasks) => loader(dispatch(fetchTasksAction(options)));
  const createTask = (options: ICreateTask) => loader(dispatch(createTaskAction(options)));

  const findLastDuration = (timeSession: ISession[], dn: number) => {
    return dn - timeSession[timeSession.length - 1].start;
  };

  const setEndSession = (timeSession: ISession[], dn: number) => {
    return [{ ...timeSession[timeSession.length - 1], ...{ end: dn } }];
  };
  const pauseTask = (options: IUpdateTask) => {
    const { uid, task } = options;
    const dn = Date.now();
    const updates = {
      uid,
      task: {
        ...task,
        isActive: false,
        duration: task.duration + findLastDuration(task.timeSession, dn),
        timeSession: setEndSession(task.timeSession, dn),
      },
    };
    return loader(dispatch(pauseTaskAction(updates)));
  };

  const addActiveTask = (tasks: ITask[]) => {
    tasks.forEach((task) => {
      if (task.isActive) {
        dispatch(addActiveTaskAction(task));
      }
    });
  };

  return {
    isLoading,
    fetchTasks,
    createTask,
    addActiveTask,
    pauseTask,
  };
};
