import { combineReducers } from 'redux';
import user from './reducers/user/user';
import tasks from './reducers/tasks/tasks';
import tags from '../store/reducers/tags';

export const rootReducer = combineReducers({ user, tasks, tags });

export type RootState = ReturnType<typeof rootReducer>;
