import { combineReducers } from 'redux';

import { user } from './reducers/user';
import { tasks } from './reducers/tasks';
import { activeTask } from './reducers/activeTask';

export const rootReducer = combineReducers({
  user,
  tasks,
  activeTask,
});
