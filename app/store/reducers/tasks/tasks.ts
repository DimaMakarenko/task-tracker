import { createSlice } from '@reduxjs/toolkit';
// actions
import { fetchTasksAction, createTaskAction, pauseTaskAction, startTaskAction } from './actions';
// types
import { ITasks } from '../../type';
// utils
import { updateTaskList } from '../../../utils/tasks';

const initialState: ITasks = {
  tasks: [],
  activeTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addActiveTaskAction: (state, actions) => {
      state.activeTask = actions.payload;
    },
  },
  extraReducers: {
    [fetchTasksAction.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
    },
    [createTaskAction.fulfilled]: (state, { payload }) => {
      state.tasks.push(payload);
    },
    [pauseTaskAction.fulfilled]: (state, { payload }) => {
      state.tasks = updateTaskList(state.tasks, payload);
      state.activeTask = null;
    },
    [startTaskAction.fulfilled]: (state, { payload }) => {
      state.tasks = updateTaskList(state.tasks, payload);
      state.activeTask = payload.task;
    },
  },
});

const { reducer, actions } = tasksSlice;

export const { addActiveTaskAction } = actions;

export default reducer;
