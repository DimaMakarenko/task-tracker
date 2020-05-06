import { useState, useEffect, useCallback, useMemo } from 'react';
import _ from 'lodash';
// api
import { listenerTaskDb } from '../db/api';
// redux
import { selectUser } from '../store/reducers/user/selectors';
import { useSelector } from 'react-redux';
// utils
import { loggedByHours, loggerByTasks, loggerPerDay } from '../utils/helpersChart';

export const useCharts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState([]);

  const { uid } = useSelector(selectUser);

  const fetch = useCallback(async () => {
    await setIsLoading(true);
    const response = await listenerTaskDb({ uid }, (value: []) => setDate(_.toArray(value)));
    await setIsLoading(false);
    return response;
  }, [uid]);

  useEffect(() => {
    fetch().catch(() => console.log('error useCatch'));
  }, [fetch]);

  const dateChartHours = useMemo(() => loggedByHours(date), [date]);

  const dateChartTasks = useMemo(() => loggerByTasks(date), [date]);

  const dateChartPerDay = useMemo(() => loggerPerDay(date), [date]);

  return {
    isLoading,
    dateChartHours,
    dateChartTasks,
    dateChartPerDay,
  };
};
