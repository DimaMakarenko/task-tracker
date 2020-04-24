import firebase from './firebaseDb';
import _ from 'lodash';
// types
import { ICreateTask, IFetchTasks } from '../store/type';

const db = firebase.database();

export const setTaskDb = (option: ICreateTask) => {
  const { uid, task } = option;
  const { id } = task;
  return db
    .ref('users/' + uid + '/tasks/')
    .child(id.toString())
    .set(task);
};

export const getTaskDb = (options: IFetchTasks) => {
  const { uid } = options;
  return db
    .ref('users/' + uid + '/tasks')
    .once('value')
    .then((snapshot) => _.toArray(snapshot.val()));
};

export const updateTaskDb = (uid: string, taskId: number, updates: any) => {
  return db
    .ref('users/' + uid + '/tasks')
    .child(taskId.toString())
    .update(updates);
};

export const deleteTaskDb = (uid: string, taskId: number) => {
  return db
    .ref('users/' + uid + '/tasks')
    .child(taskId.toString())
    .remove();
};
