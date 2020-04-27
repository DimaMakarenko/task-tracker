import { useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksAction, createTaskAction, pauseTaskAction, startTaskAction } from '../store/reducers/tasks/actions';
import { addActiveTaskAction } from '../store/reducers/tasks/tasks';
import { getUser } from '../store/reducers/user/selectors';
// types
import { ICreateTask, ITask } from '../store/type';
// utils
import { findLastDuration, setEndSession, setStartSession } from '../utils/time';

export const useTaskAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { uid } = useSelector(getUser);

  const loader = (action: Function) => {
    return () => {
      setIsLoading(true);
      action();
      setIsLoading(false);
    };
  };

  const fetchTasks = () => loader(dispatch(fetchTasksAction({ uid })));
  const createTask = (options: ICreateTask) => loader(dispatch(createTaskAction(options)));

  const pauseTask = ({ task }: { task: ITask }) => {
    const dn = Date.now();
    const updates = {
      uid,
      task: {
        ...task,
        isActive: false,
        duration: task.duration + findLastDuration(task.timeSession, dn),
        timeSession: setEndSession([...task.timeSession], dn),
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

  const startTask = (task: ITask) => {
    console.log('start', task);
    const dn = Date.now();
    const updates = {
      uid,
      task: {
        ...task,
        isActive: true,
        timeSession: setStartSession([...task.timeSession], dn),
      },
    };
    return loader(dispatch(startTaskAction(updates)));
  };

  return {
    isLoading,
    fetchTasks,
    createTask,
    addActiveTask,
    pauseTask,
    startTask,
  };
};
