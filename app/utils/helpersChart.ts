import { DateTime, Duration, Interval } from 'luxon';
import { ITask } from '../store/type';
import { LineChartData, StackedBarChartData } from 'react-native-chart-kit';

const randomColor = require('randomcolor');

const dates = {
  start: new Date(2020, 3, 29),
  end: new Date(2020, 4, 5),
};

const getIntervalBetweenDates = (start: Date, end: Date): Interval => {
  const datesStart = DateTime.fromJSDate(start).startOf('day');
  const datesEnd = DateTime.fromJSDate(end).endOf('day');
  return Interval.fromDateTimes(datesStart, datesEnd);
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

export const loggerPerDay: (date: ITask[], searchData: Date) => StackedBarChartData = (
  date: ITask[],
  searchData: Date,
) => {
  const datesInterval = getIntervalBetweenDates(searchData, searchData);
  const dayIntervals = datesInterval.splitBy(Duration.fromObject({ hour: 1 }));

  const resultsByDate = dayIntervals.map((dayInterval) => {
    const result = {
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

          switch (true) {
            case dayInterval.contains(sessionStart) && dayInterval.contains(sessionEnd):
              const workInterval_1 = Interval.fromDateTimes(sessionStart, sessionEnd);
              const hours_1 = workInterval_1.toDuration('hours').toObject().hours;
              if (hours_1) {
                result.duration.push(hours_1);
              }
              break;

            case dayInterval.contains(sessionStart) && dayIntervalEnd < sessionEnd:
              const workInterval_2 = Interval.fromDateTimes(sessionStart, dayIntervalEnd);
              const hours_2 = workInterval_2.toDuration('hours').toObject().hours;
              if (hours_2) {
                result.duration.push(hours_2);
              }
              break;

            case dayInterval.contains(sessionEnd) && dayIntervalStart > sessionStart:
              const workInterval_3 = Interval.fromDateTimes(dayIntervalStart, sessionEnd);
              const hours_3 = workInterval_3.toDuration('hours').toObject().hours;
              if (hours_3) {
                result.duration.push(hours_3);
              }
              break;

            case dayIntervalEnd < sessionEnd &&
              dayInterval.isAfter(sessionStart) &&
              sessionStart > dayStart &&
              sessionStart < dayEnd:
              const workInterval_4 = Interval.fromDateTimes(dayIntervalStart, dayIntervalEnd);
              const hours_4 = workInterval_4.toDuration('hours').toObject().hours;
              if (hours_4) {
                result.duration.push(hours_4);
              }
              break;

            default:
              break;
          }
        }
      });
    });
    return result;
  });

  console.log(resultsByDate);
  return {
    labels: [0, 2, 4, 6, 8, 10, 12, 2, 4, 6, 8, 10],
    legend: [],
    data: resultsByDate.map((el) => el.duration),
    barColors: resultsByDate.map((el) => randomColor({ hue: 'monochrome', count: el.duration.length })),
  };
};

/*
randomColor({ hue: 'monochrome', count: resultsByDate.length })

+new Date(2020,4,3, 8,0),
+new Date(2020,4,3, 9,15),

+new Date(2020,4,3, 12,10),
+new Date(2020,4,3, 14,30),

+new Date(2020,4,3, 15,00),
+new Date(2020,4,3, 18,10),

+new Date(2020,4,3, 18,15),
+new Date(2020,4,3, 18,30),


+new Date(2020,4,3, 18,50),
+new Date(2020,4,3, 20,30),

1588482000000 1588486500000
1588518900000 1588519800000

1588497000000 1588505400000
1588521000000 1588527000000

1588507200000 1588518600000
 */
