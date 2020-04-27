import { RootState } from '../../rootReducer';

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectActiveTask = (state: RootState) => state.tasks.activeTask;
