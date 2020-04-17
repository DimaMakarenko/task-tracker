// @ts-ignore
import { all, takeLatest, select, put } from 'redux-saga/effects';
import { FETCH_TASKS, addTask } from '../reducers/tasks';

import { getTaskDb } from '../../utils/api';

function* fetchTasks() {
  const uid = yield select((state) => state.user.userId);

  const tasks = yield getTaskDb(uid);
  for (let key in tasks) {
    console.log('tasl');
    yield put(addTask(tasks[key]));
  }
}

export function* watchTasks() {
  yield all([takeLatest(FETCH_TASKS, fetchTasks)]);
}
