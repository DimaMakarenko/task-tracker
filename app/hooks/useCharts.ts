import { useState, useEffect, useCallback, useMemo } from 'react';
import _ from 'lodash';
// api
import { listenerTaskDb } from '../db/api';
// redux
import { selectUser } from '../store/reducers/user/selectors';
import { useSelector } from 'react-redux';
// utils
import { loggedByHours, loggerByTasks, loggerPerDay, getActiveWeeks } from '../components/Charts/helpersChart';
// types
import { TWeek } from '../components/Charts/type';

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
    fetch().catch(() => {
      setDate([]);
      console.log('error useCatch');
    });
  }, [fetch]);

  const activeWeeks = useMemo(() => (date.length > 0 ? getActiveWeeks(date) : undefined), [date]);

  const dateChartHours = useCallback((week: TWeek) => loggedByHours(date, week), [date]);

  const dateChartTasks = useCallback((week: TWeek) => loggerByTasks(date, week), [date]);

  const dateChartPerDay = useCallback((searchData) => loggerPerDay(date, searchData), [date]);

  return {
    isLoading,
    dateChartHours,
    dateChartTasks,
    dateChartPerDay,
    activeWeeks,
  };
};
