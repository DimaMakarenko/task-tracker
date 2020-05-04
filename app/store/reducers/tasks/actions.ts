import { createAsyncThunk } from '@reduxjs/toolkit';
// types
import { ICreateTask, IUpdateTask } from '../../type';
// api
import { setTaskDb, updateTaskDb } from '../../../db/api';
import { getNewTask } from '../../../utils/tasks';

export const createTaskAction: any = createAsyncThunk('tasks/createTask', async (options: ICreateTask) => {
  const { uid, task } = options;
  const newTask = getNewTask(task);
  await setTaskDb({ uid, task: newTask });
  return newTask;
});

export const pauseTaskAction: any = createAsyncThunk('task/updateTask', async (options: IUpdateTask) => {
  await updateTaskDb(options);
  return options;
});

export const startTaskAction: any = createAsyncThunk('task/startTask', async (options: IUpdateTask) => {
  await updateTaskDb(options);
  return options;
});
