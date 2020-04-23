import firebase from './firebaseDb';
import { ITask } from '../types/store';
import _ from 'lodash';

const db = firebase.database();

export const setTaskDb = (uid: string, task: ITask) => {
  const { id } = task;
  return db
    .ref('users/' + uid + '/tasks/')
    .child(id.toString())
    .set(task);
};

export const getTaskDb = (uid: string) => {
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
