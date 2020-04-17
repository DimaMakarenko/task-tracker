import { all, fork } from 'redux-saga/effects';
import { watchTasks } from './sagas/tasks';

export function* rootSaga() {
  yield all([fork(watchTasks)]);
}
