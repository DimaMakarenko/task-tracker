import { useState, useCallback } from 'react';
import { listenerTaskDb } from '../utils/api';
import _ from 'lodash';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAction, pauseTaskAction, startTaskAction } from '../store/reducers/tasks/actions';
import { addTasksAction, addActiveTaskAction } from '../store/reducers/tasks/tasks';
import { selectUser } from '../store/reducers/user/selectors';
// types
import { ICreateTask, ITask } from '../store/type';
// utils
import { findLastDuration, setEndSession, setStartSession } from '../utils/time';

export const useTaskAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { uid } = useSelector(selectUser);

  const handleFetch = useCallback(async () => {
    await listenerTaskDb({ uid }, (value: any) => dispatch(addTasksAction(_.toArray(value))));
  }, [dispatch, uid]);

  const fetchTasks = useCallback(() => {
    handleFetch().catch(() => console.log('error in data fetching'));
  }, [handleFetch]);

  const createTask = useCallback((options: ICreateTask) => dispatch(createTaskAction(options)), [dispatch]);

  const pauseTask = useCallback(
    ({ task }: { task: ITask }) => {
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
      dispatch(pauseTaskAction(updates));
    },
    [dispatch, uid],
  );

  const addActiveTask = useCallback(
    (tasks: ITask[]) => {
      tasks.forEach((task) => {
        if (task.isActive) {
          dispatch(addActiveTaskAction(task));
        }
      });
    },
    [dispatch],
  );

  const startTask = useCallback(
    (task: ITask) => {
      const dn = Date.now();
      const updates = {
        uid,
        task: {
          ...task,
          isActive: true,
          timeSession: setStartSession([...task.timeSession], dn),
        },
      };
      dispatch(startTaskAction(updates));
    },
    [dispatch, uid],
  );

  return {
    isLoading,
    fetchTasks,
    createTask,
    pauseTask,
    addActiveTask,
    startTask,
  };
};
