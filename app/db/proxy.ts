import firebase from './firebaseDb';
import _ from 'lodash';
// types
import { ITag } from '../store/type';

const db = firebase.database();

interface IProxyFilter {
  filterTags: ITag;
  ref: string;
}

const filter = (_filter: any[], data: any[]) => {
  return _filter.some((r: string) => data.includes(r));
};

export const proxyFilter = async (options: IProxyFilter) => {
  const { filterTags, ref } = options;
  const tasks = await db
    .ref(ref)
    .once('value')
    .then((snapshot) => _.toArray(snapshot.val()));

  return tasks.filter((task) => (task.tags ? filter(filterTags, task.tags) : false));
};
