import { useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { fetchTasksAction, createTaskAction } from '../store/reducers/tasks/actions';

export const useTaskAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const loader = (action) => {
    return () => {
      setIsLoading(true);
      action();
      setIsLoading(false);
    };
  };

  const addTasks = (uid) => loader(dispatch(fetchTasksAction(uid)));
  const createTask = (option) => loader(dispatch(createTaskAction(option)));

  return {
    isLoading,
    addTasks,
    createTask,
  };
};
