import { createAsyncThunk } from '@reduxjs/toolkit';
// types
import { ITask, IAddTask } from '../../type';
// api
import { getTaskDb, setTaskDb } from '../../../utils/api';
import { getNewTask } from '../../../utils/taskGenerate';

export const fetchTasksAction: any = createAsyncThunk('tasks/fetchTasks', async (uid: string) => {
  const response: ITask[] = await getTaskDb({ uid });
  return response;
});

export const createTaskAction: any = createAsyncThunk('tasks/createTask', async (props: IAddTask) => {
  const { uid, task } = props;
  const newTask = getNewTask(task);
  const response = await setTaskDb(uid, newTask);
  return response;
});
