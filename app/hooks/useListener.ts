import { useState, useEffect, useCallback } from 'react';
// api
import { listenerTaskDb } from '../db/api';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { addTasksAction } from '../store/reducers/tasks/tasks';
// utils
import _ from 'lodash';
import { selectUser } from '../store/reducers/user/selectors';

export const useListener = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { uid } = useSelector(selectUser);

  const fetchData = useCallback(async () => {
    await setIsLoading(true);
    const result = await listenerTaskDb({ uid }, async (value: []) => {
      await dispatch(addTasksAction(_.toArray(value)));
      await setIsLoading(false);
    });

    return result;
  }, [dispatch, uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    isLoading,
    fetchData,
  };
};
