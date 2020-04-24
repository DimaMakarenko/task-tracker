import { createSlice } from '@reduxjs/toolkit';
// actions
import { fetchTasksAction } from './actions';
// types
import { ITask } from '../../type';

const initialState: ITask[] = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTasksAction.fulfilled]: (state: ITask[], { payload }) => payload,
  },
});

const { reducer, actions } = tasksSlice;

export default reducer;
