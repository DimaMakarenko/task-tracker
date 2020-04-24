import { createAsyncThunk } from '@reduxjs/toolkit';
// types
import { ITask, ICreateTask, IFetchTasks } from '../../type';
// api
import { getTaskDb, setTaskDb } from '../../../utils/api';
import { getNewTask } from '../../../utils/taskGenerate';

export const fetchTasksAction: any = createAsyncThunk('tasks/fetchTasks', async (options: IFetchTasks) => {
  const { uid } = options;
  const response: ITask[] = await getTaskDb({ uid });
  return response;
});

export const createTaskAction: any = createAsyncThunk('tasks/createTask', async (options: ICreateTask) => {
  const { uid, task } = options;
  const newTask = getNewTask(task);
  await setTaskDb({ uid, task: newTask });
  return newTask;
});
