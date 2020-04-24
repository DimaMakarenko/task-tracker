import { useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { fetchTasksAction, createTaskAction, pauseTaskAction } from '../store/reducers/tasks/actions';
import { addActiveTaskAction } from '../store/reducers/tasks/tasks';
// types
import { ICreateTask, IFetchTasks, ITask, IUpdateTask } from '../store/type';

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

  const pauseTask = (options: IUpdateTask) => {
    const { uid, taskId } = options;
    const updates = {
      uid,
      taskId,
      updates: {
        isActive: false,
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
