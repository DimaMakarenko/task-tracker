import { DateTime, Duration, Interval } from 'luxon';
import { ITask } from '../store/type';
import { LineChartData } from 'react-native-chart-kit';

const dates = {
  start: new Date(2020, 3, 29),
  end: new Date(2020, 4, 5),
};

const getIntervalBetweenDates = (start: Date, end: Date): Interval => {
  const datesStart = DateTime.fromJSDate(start).startOf('day');
  const datesEnd = DateTime.fromJSDate(end).endOf('day');
  return Interval.fromDateTimes(datesStart, datesEnd);
};

export const loggedByHours: (date: ITask[]) => LineChartData = (date: ITask[]) => {
  const datesInterval = getIntervalBetweenDates(dates.start, dates.end);
  const dayIntervals = datesInterval.splitBy(Duration.fromObject({ days: 1 }));

  const resultsByDate = dayIntervals.map((dayInterval) => {
    const result = {
      date: dayInterval.start.toFormat('d.LL'),
      duration: 0,
    };
    date.forEach((task) => {
      task.timeSession.forEach((session) => {
        if (session.end) {
          const sessionStart = DateTime.fromMillis(session.start);

          if (dayInterval.contains(sessionStart)) {
            const sessionEnd = DateTime.fromMillis(session.end);
            const workInterval = Interval.fromDateTimes(sessionStart, sessionEnd);
            const hours = workInterval.toDuration('hours').toObject().hours;

            if (hours) {
              result.duration += hours;
            }
          }
        }
      });
    });
    return result;
  });
  return {
    labels: resultsByDate.map((el) => el.date),
    datasets: [
      {
        data: resultsByDate.map((el) => el.duration),
      },
    ],
    legend: [],
  };
};

export const loggerByTasks: (date: ITask[]) => LineChartData = (date: ITask[]) => {
  const datesInterval = getIntervalBetweenDates(dates.start, dates.end);
  const dayIntervals = datesInterval.splitBy(Duration.fromObject({ days: 1 }));

  const resultsByDate = dayIntervals.map((dayInterval) => {
    const result = {
      date: dayInterval.start.toFormat('d.LL'),
      count: 0,
    };

    date.forEach((task) => {
      let flag = true;

      task.timeSession.forEach((session) => {
        const sessionStart = DateTime.fromMillis(session.start);

        if (dayInterval.contains(sessionStart) && flag) {
          result.count++;
          flag = false;
        }
      });
    });

    return result;
  });
  return {
    labels: resultsByDate.map((el) => el.date),
    datasets: [
      {
        data: resultsByDate.map((el) => el.count),
      },
    ],
    legend: [],
  };
};
