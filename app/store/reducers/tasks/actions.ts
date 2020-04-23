import { createAsyncThunk } from '@reduxjs/toolkit';
// types
import { ITask } from '../../type';
// api
import { getTaskDb } from '../../../utils/api';

export const fetchTasks: any = createAsyncThunk('tasks/fetchTasks', async (uid: string) => {
  const response: ITask[] = await getTaskDb(uid);
  return response;
});
