import { RootState } from '../../rootReducer';

export const getTasks = (state: RootState) => state.tasks.tasks;
export const getActiveTask = (state: RootState) => state.tasks.activeTask;
