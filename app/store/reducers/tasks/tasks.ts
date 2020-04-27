import { createSlice } from '@reduxjs/toolkit';
// actions
import { pauseTaskAction, startTaskAction } from './actions';
// types
import { ITasks } from '../../type';
// utils

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
    addTasksAction: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: {
    [pauseTaskAction.fulfilled]: (state) => {
      state.activeTask = null;
    },
    [startTaskAction.fulfilled]: (state, { payload }) => {
      state.activeTask = payload.task;
    },
  },
});

const { reducer, actions } = tasksSlice;

export const { addTasksAction, addActiveTaskAction } = actions;

export default reducer;
