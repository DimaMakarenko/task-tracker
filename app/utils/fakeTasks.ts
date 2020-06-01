import { ITask, TFakeTask } from '../store/type';

export const faker = require('faker');

export const fakeEmail = faker.internet.email();

let endTimeTask = +new Date(2020, 4, 1);

const fakeTask: () => ITask = () => {
  const { hacker, random, lorem } = faker;

  const title = hacker.noun();
  const project = hacker.abbreviation();
  const startTimer = endTimeTask;
  const id = endTimeTask;

  const isFinished = random.number({ min: 0, max: 1 }) === 0;

  const tagCount = random.number({ min: 0, max: 3 });
  const tags = [...Array(tagCount)].map(() => lorem.word());

  let duration = 0;
  let newSessionStart = endTimeTask;
  const sessionCount = random.number({ min: 1, max: 5 });

  const timeSession = [...Array(sessionCount)].map(() => {
    const sessionDuration = random.number({ min: 300000, max: 7200000 });
    const pauseBetweenSession = random.number({ min: 10800000, max: 43200000 });
    const session = {
      start: newSessionStart,
      end: newSessionStart + sessionDuration,
    };
    newSessionStart += pauseBetweenSession + sessionDuration;
    duration += sessionDuration;
    return session;
  });

  endTimeTask = newSessionStart;
  return {
    title,
    project,
    startTimer,
    id,
    isFinished,
    duration,
    timeSession,
    isActive: false,
    tags,
    file: null,
  };
};

export const generateFakeTasks = () => {
  const { random } = faker;
  const taskCount = random.number({ min: 10, max: 15 });

  const tasksObj: TFakeTask = {};
  [...Array(taskCount)].forEach(() => {
    const fTask = fakeTask();
    tasksObj[fTask.id] = fTask;
  });
  return tasksObj;
};
