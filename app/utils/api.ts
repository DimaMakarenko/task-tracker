import { useState, useEffect } from 'react';
import firebase from './firebaseDb';
import { ITask } from '../types/store';

const db = firebase.database();

export const setTaskDb = (uid: string, task: ITask) => {
  const { id } = task;
  db.ref('users/' + uid + '/tasks/')
    .child(id.toString())
    .set(task);
};

export const getTaskDb = (uid: string) => {
  return db
    .ref('users/' + uid + '/tasks')
    .once('value')
    .then((snap) => snap.val());
};

interface IState {
  resource: null | ITask[];
  isLoading: boolean;
}

interface IUseFetchTask {
  uid: string;
}
export const useFetchTask = (uid: string) => {
  const [{ resource, isLoading }, setResourse] = useState<IState>({
    resource: null,
    isLoading: true,
  });
  useEffect(() => {
    console.log(`start fetch user tasks:${uid} `);
    firebase
      .database()
      .ref('users/' + uid + '/tasks/')
      .on('value', (snap) => {
        setResourse({
          resource: snap.val(),
          isLoading: false,
        });
      });
    return () => {
      console.log(`remove fetch user tasks:${uid} `);
      firebase
        .database()
        .ref('users/' + uid + '/tasks/')
        .off();
    };
  }, [uid]);
  return { resource, isLoading };
};
