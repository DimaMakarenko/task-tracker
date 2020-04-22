// @ts-ignore
import { all, takeLatest, select, put } from 'redux-saga/effects';
// reducers
import {
  FETCH_TASKS,
  CREATE_TASK,
  PAUSE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  addTask,
  deleteTasks,
} from '../reducers/tasks';
import { addActiveTask, removeActiveTask } from '../reducers/activeTask';
// db
import { getTaskDb, setTaskDb, updateTaskDb, deleteTaskDb } from '../../utils/api';
// interfaces
import { IDeleteTask, ICreateTask, IPauseTask, IUpdateTask } from '../../types/sagas';
// utils
import { newTask as getNewTask } from '../../utils/taskGenerate';

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

function* createTask(props: ICreateTask) {
  const { payload } = props;
  const uid = yield select((state) => state.user.userId);
  const newTask = getNewTask({ title: payload.title, project: payload.project });
  try {
    yield setTaskDb(uid, newTask).catch(() => {
      throw 'Not recorded task';
    });
    yield fetchTasks();
  } catch (e) {
    console.error(e);
  }
}

function* pauseTask(props: IPauseTask) {
  const { payload } = props;
  const uid = yield select((state) => state.user.userId);
  const startTask = yield select((state) => state.activeTask.startTimer);
  const duration = Date.now() - startTask;
  try {
    yield updateTaskDb(uid, payload, { isActive: false, duration }).catch(() => console.log('wrong connect'));
    yield put(removeActiveTask());
    yield fetchTasks();
  } catch (e) {
    console.error(e);
  }
}

function* deleteTask(props: IDeleteTask) {
  const { payload } = props;
  const uid = yield select((state) => state.user.userId);
  try {
    yield deleteTaskDb(uid, payload).catch(() => console.log('not delete task'));
    yield fetchTasks();
  } catch (e) {
    console.error(e);
  }
}

function* updateTask(props: IUpdateTask) {
  const { payload } = props;
  const { id, task } = payload;
  const uid = yield select((state) => state.user.userId);

  try {
    yield updateTaskDb(uid, id, task);
    yield fetchTasks();
  } catch (e) {
    console.error(e);
  }
}

export function* watchTasks() {
  yield all([
    takeLatest(FETCH_TASKS, fetchTasks),
    takeLatest(CREATE_TASK, createTask),
    takeLatest(PAUSE_TASK, pauseTask),
    takeLatest(DELETE_TASK, deleteTask),
    takeLatest(UPDATE_TASK, updateTask),
  ]);
}
