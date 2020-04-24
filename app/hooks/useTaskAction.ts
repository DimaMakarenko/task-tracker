import { useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { fetchTasksAction, createTaskAction } from '../store/reducers/tasks/actions';
// types
import { ICreateTask, IFetchTasks } from '../store/type';

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

  return {
    isLoading,
    fetchTasks,
    createTask,
  };
};
