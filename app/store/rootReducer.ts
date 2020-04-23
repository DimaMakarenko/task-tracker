import { combineReducers } from 'redux';
import user from './reducers/user/user';
import tasks from './reducers/tasks/tasks';

export const rootReducer = combineReducers({ user, tasks });

export type RootState = ReturnType<typeof rootReducer>;
