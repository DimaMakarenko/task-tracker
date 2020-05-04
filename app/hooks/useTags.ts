import { useCallback } from 'react';
import _ from 'lodash';

// redux
import { fetchTagsAction, clearTagsAction } from '../store/reducers/tags';
import { useDispatch } from 'react-redux';
// types
import { ITask } from '../store/type';

export const useTags = () => {
  const dispatch = useDispatch();

  const fetchTags = useCallback(
    (tasks: ITask[]) => {
      dispatch(clearTagsAction());
      tasks.forEach((task) => {
        if (task.tags) {
          dispatch(fetchTagsAction(_.toArray(task.tags)));
        }
      });
    },
    [dispatch],
  );
  return {
    fetchTags,
  };
};
