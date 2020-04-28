import { DateTime } from 'luxon';
import { ISession } from '../store/type';

export const formatMills = (date: any): string => DateTime.fromMillis(date).toFormat('d LLL, HH:mm');

export const dateFromMillis = (milliseconds: number): string => DateTime.fromMillis(milliseconds).toFormat('HH:mm:ss');

export const durationFromMills = (milliseconds: number): string =>
  DateTime.fromMillis(milliseconds).setZone('UTC+0').toFormat('HH:mm:ss');

export const findLastDuration = (timeSession: ISession[], dn: number) => {
  return dn - timeSession[timeSession.length - 1].start;
};

export const setEndSession = (timeSession: ISession[], dn: number) => {
  const newSessions = [...timeSession];
  const lastSession = { ...timeSession[timeSession.length - 1] };
  lastSession.end = dn;
  newSessions[newSessions.length - 1] = lastSession;
  return newSessions;
};

export const setStartSession = (timeSession: ISession[], dn: number) => {
  const newSession = {
    start: dn,
  };
  return [...timeSession, newSession];
};

export const lastSessionStart = (timeSession: ISession[]) => {
  return timeSession[timeSession.length - 1].start;
};

export const lastSessionEnd = (timeSession: ISession[], isActive: boolean) => {
  if (!isActive) {
    return timeSession[timeSession.length - 1].end;
  }
  return timeSession.length < 1 ? timeSession[timeSession.length - 2].end : null;
};
