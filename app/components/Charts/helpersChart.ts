import { DateTime, Duration, Interval, DurationUnit } from 'luxon';
import { ITask } from '../../store/type';
import { LineChartData, StackedBarChartData } from 'react-native-chart-kit';
// types
import { TWeek } from './type';

const randomColor = require('randomcolor');

const getIntervalBetweenDates = (start: Date, end: Date, unit: DurationUnit): Interval => {
  const datesStart = DateTime.fromJSDate(start).startOf(unit);
  const datesEnd = DateTime.fromJSDate(end).endOf(unit);
  return Interval.fromDateTimes(datesStart, datesEnd);
};

export const loggerByTasks: (date: ITask[], week: TWeek) => LineChartData = (date, week) => {
  const datesInterval = getIntervalBetweenDates(week.start, week.end, 'day');
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

export const loggedByHours: (date: ITask[], week: TWeek) => LineChartData = (date, week) => {
  const datesInterval = getIntervalBetweenDates(week.start, week.end, 'day');
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

export const loggerPerDay: (date: ITask[], searchData: Date) => StackedBarChartData = (date, searchData) => {
  const datesInterval = getIntervalBetweenDates(searchData, searchData, 'day');
  const dayIntervals = datesInterval.splitBy(Duration.fromObject({ hour: 1 }));

  const resultsByDate = dayIntervals.map((dayInterval) => {
    const result: { date: string; duration: number[] } = {
      date: dayInterval.start.toFormat('H'),
      duration: [],
    };
    date.forEach((task) => {
      task.timeSession.forEach((session) => {
        if (session.end) {
          const sessionStart = DateTime.fromMillis(session.start);
          const sessionEnd = DateTime.fromMillis(session.end);

          const dayStart = DateTime.fromJSDate(searchData).startOf('day');
          const dayEnd = DateTime.fromJSDate(searchData).endOf('day');

          const dayIntervalStart = dayInterval.start;
          const dayIntervalEnd = dayInterval.end;

          if (dayInterval.contains(sessionStart) && dayInterval.contains(sessionEnd)) {
            const workInterval = Interval.fromDateTimes(sessionStart, sessionEnd);
            const hours = workInterval.toDuration('hours').toObject().hours;
            if (hours) {
              result.duration.push(hours);
            }
          } else if (dayInterval.contains(sessionStart) && dayIntervalEnd < sessionEnd) {
            const workInterval = Interval.fromDateTimes(sessionStart, dayIntervalEnd);
            const hours = workInterval.toDuration('hours').toObject().hours;
            if (hours) {
              result.duration.push(hours);
            }
          } else if (dayInterval.contains(sessionEnd) && dayIntervalStart > sessionStart) {
            const workInterval = Interval.fromDateTimes(dayIntervalStart, sessionEnd);
            const hours = workInterval.toDuration('hours').toObject().hours;
            if (hours) {
              result.duration.push(hours);
            }
          } else if (
            dayIntervalEnd < sessionEnd &&
            dayInterval.isAfter(sessionStart) &&
            sessionStart > dayStart &&
            sessionStart < dayEnd
          ) {
            const workInterval = Interval.fromDateTimes(dayIntervalStart, dayIntervalEnd);
            const hours = workInterval.toDuration('hours').toObject().hours;
            if (hours) {
              result.duration.push(hours);
            }
          } else {
          }
        }
      });
    });
    return result;
  });

  return {
    labels: ['0', '2', '4', '6', '8', '10', '12', '2', '4', '6', '8', '10'],
    legend: [],
    data: resultsByDate.map((el) => el.duration),
    barColors: resultsByDate.map((el) => randomColor({ hue: 'monochrome', count: el.duration.length })),
  };
};

export const getActiveWeeks: (date: ITask[]) => TWeek[] = (date) => {
  const minStartTask = date.reduce((min, b) => Math.min(min, b.startTimer), date[0].startTimer);
  const datesInterval = getIntervalBetweenDates(new Date(minStartTask), new Date(), 'week');
  const weeksIntervals = datesInterval.splitBy(Duration.fromObject({ week: 1 }));

  const resultsByWeeks = weeksIntervals.map((weekInterval) => {
    const result = {
      dateS: weekInterval.start.toFormat('D'),
      dateE: weekInterval.end.toFormat('D'),
      isActive: false,
    };

    !result.isActive &&
      date.forEach((task) => {
        task.timeSession.map((session) => {
          if (session.end) {
            const sessionStart = DateTime.fromMillis(session.start);
            const sessionEnd = DateTime.fromMillis(session.end);
            if (weekInterval.contains(sessionStart) || weekInterval.contains(sessionEnd)) {
              result.isActive = true;
            }
          }
        });
      });
    return result;
  });

  return resultsByWeeks
    .filter((week) => week.isActive)
    .map((week) => ({ start: new Date(week.dateS), end: new Date(week.dateE) }));
};
