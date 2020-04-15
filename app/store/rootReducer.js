import { combineReducers } from 'redux';

import { user } from './reducers/user';
import { tasks } from './reducers/tasks';
import { activeTaskId } from './reducers/activeTask';

export const rootReducer = combineReducers({
  user,
  tasks,
  activeTaskId,
});
