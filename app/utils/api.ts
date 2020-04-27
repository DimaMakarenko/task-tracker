import firebase from './firebaseDb';
// types
import { ICreateTask, IFetchTasks, IUpdateTask } from '../store/type';

const db = firebase.database();

export const setTaskDb = (option: ICreateTask) => {
  const { uid, task } = option;
  const { id } = task;
  return db
    .ref('users/' + uid + '/tasks/')
    .child(id.toString())
    .set(task);
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

export const deleteTaskDb = (uid: string, taskId: number) => {
  return db
    .ref('users/' + uid + '/tasks')
    .child(taskId.toString())
    .remove();
};
