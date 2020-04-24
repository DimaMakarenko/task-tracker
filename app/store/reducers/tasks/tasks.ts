import { createSlice } from '@reduxjs/toolkit';
// actions
import { fetchTasksAction, createTaskAction } from './actions';
// types
import { ITask } from '../../type';

const initialState: ITask[] = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTasksAction.fulfilled]: (state: ITask[], { payload }) => payload,
    [createTaskAction.fulfilled]: (state, { payload }) => {
      state.push(payload);
    },
  },
});

const { reducer, actions } = tasksSlice;

export default reducer;
