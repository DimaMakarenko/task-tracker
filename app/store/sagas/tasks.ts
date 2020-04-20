// @ts-ignore
import { all, takeLatest, select, put } from 'redux-saga/effects';
import { FETCH_TASKS, CREATE_TASK, PAUSE_TASK, addTask, deleteTasks } from '../reducers/tasks';
import { addActiveTask, removeActiveTask } from '../reducers/activeTask';
import { getTaskDb, setTaskDb, updateTaskDb } from '../../utils/api';

function* fetchTasks() {
  const uid = yield select((state) => state.user.userId);
  yield put(deleteTasks());
  const tasks = yield getTaskDb(uid);
  for (let key in tasks) {
    yield put(addTask(tasks[key]));

    if (tasks[key].isActive) {
      yield put(addActiveTask({ id: tasks[key].id, title: tasks[key].title, startTimer: tasks[key].startTimer }));
    }
  }
}

function* createTask({ payload }) {
  const uid = yield select((state) => state.user.userId);
  const dn = Date.now();
  const newTask = {
    id: dn,
    title: payload.title,
    project: payload.project,
    duration: 0,
    isActive: true,
    isDone: false,
    startTimer: dn,
  };
  try {
    yield setTaskDb(uid, newTask).catch(() => {
      throw 'Not recorded task';
    });
    yield fetchTasks();
  } catch (e) {
    console.error(e);
  }
}

function* pauseTask({ payload }) {
  const uid = yield select((state) => state.user.userId);
  const startTask = yield select((state) => state.activeTask.startTimer);
  const duration = Date.now() - startTask;
  yield updateTaskDb(uid, payload, { isActive: false, duration })
    .then(() => console.log('update'))
    .catch(() => console.log('wrong connect'));
  yield put(removeActiveTask());
  yield fetchTasks();
}

export function* watchTasks() {
  yield all([
    takeLatest(FETCH_TASKS, fetchTasks),
    takeLatest(CREATE_TASK, createTask),
    takeLatest(PAUSE_TASK, pauseTask),
  ]);
}
