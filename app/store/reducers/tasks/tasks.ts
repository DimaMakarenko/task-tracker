import { createSlice } from '@reduxjs/toolkit';
// actions
import { fetchTasks } from './actions';
// types
import { ITask } from '../../type';

const initialState: ITask[] = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTasks.fulfilled]: (state: ITask[], { payload }) => payload,
  },
});

const { reducer } = tasksSlice;

export default reducer;
