import { combineReducers } from 'redux';

import { user } from './reducers/user';
import { tasks } from './reducers/tasks';

export const rootReducer = combineReducers({
  user,
  tasks,
});
