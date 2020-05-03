import { useCallback } from 'react';
import _ from 'lodash';
// api
import { filterTaskDb, listenerTaskDb } from '../db/api';
// redux
import { fetchTagsAction, clearTagsAction } from '../store/reducers/tags';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/reducers/user/selectors';
import { addTasksAction } from '../store/reducers/tasks/tasks';
// types
import { ITask, ITag } from '../store/type';

export const useTags = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector(selectUser);

  const fetchTags = useCallback(async () => {
    dispatch(clearTagsAction());
    await listenerTaskDb({ uid }, (value: any) => {
      return _.toArray(value).forEach(({ tags }: { tags: ITask }) => tags && dispatch(fetchTagsAction(tags)));
    });
  }, [dispatch, uid]);

  const filterTags = async (filteredTags: ITag) => {
    const ref = `users/${uid}/tasks`;
    const filtered = await filterTaskDb({ uid, filterTags: filteredTags, ref });
    dispatch(addTasksAction(filtered));
  };

  return {
    fetchTags,
    filterTags,
  };
};
