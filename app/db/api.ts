import firebase from './firebaseDb';
// types
import {
  ICreateTask,
  IFetchTasks,
  IUpdateTask,
  IDeleteTask,
  IFilterTask,
  IGenerateTasks,
  IUploadFileDb,
} from '../store/type';
import { proxyFilter } from './proxy';

const db = firebase.database();
const storage = firebase.storage();

export const setTaskDb = (option: ICreateTask) => {
  const { uid, task } = option;
  const { id } = task;
  return db
    .ref('users/' + uid + '/tasks/')
    .child(id.toString())
    .set(task);
};

export const generateTasksDb = (option: IGenerateTasks) => {
  const { uid, tasks } = option;
  return db.ref('users/' + uid + '/tasks/').set(tasks);
};

export const listenerTaskDb = (options: IFetchTasks, callback: any) => {
  const { uid } = options;
  db.ref('users/' + uid + '/tasks').on('value', (snapshot) => {
    callback(snapshot.val());
  });
};

export const updateTaskDb = (options: IUpdateTask) => {
  const { uid, task } = options;
  return db
    .ref('users/' + uid + '/tasks')
    .child(task.id.toString())
    .update(task);
};

export const deleteTaskDb = (options: IDeleteTask) => {
  const { uid, taskId } = options;
  return db
    .ref('users/' + uid + '/tasks')
    .child(taskId.toString())
    .remove();
};

export const filterTaskDb = (options: IFilterTask) => {
  return proxyFilter(options);
};

export const uploadFileDb = async (options: IUploadFileDb) => {
  const { uid, file } = options;

  const response = await fetch(file.uri);
  const blob = await response.blob();

  const ref = storage.ref().child(`file/${uid}/${file.fileName}`);

  const snapshot = await ref.put(blob);

  const uri = await snapshot.ref.getDownloadURL();

  return uri;
};
