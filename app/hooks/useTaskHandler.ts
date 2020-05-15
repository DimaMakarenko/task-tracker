import { useCallback } from 'react';
import { useTasks } from './useTasks';
import { stopActiveTask } from '../components/Toast';
import { tasksRoutes } from '../navigation/routes';

export const useTaskHandler = () => {
  const { pauseTask, deleteTask, startTask } = useTasks();

  const handlePause = useCallback(
    (pausedTask) => {
      pauseTask({ task: pausedTask });
    },
    [pauseTask],
  );

  const handleStart = useCallback(
    (startedTask, activeTask) => {
      activeTask ? stopActiveTask() : startTask(startedTask);
    },
    [startTask],
  );

  const handleDelete = useCallback(
    (id) => {
      deleteTask(id);
    },
    [deleteTask],
  );

  const handleEdit = useCallback((navigate, taskId) => {
    navigate(tasksRoutes.EDIT, { taskId });
  }, []);

  return { handlePause, handleDelete, handleStart, handleEdit };
};
