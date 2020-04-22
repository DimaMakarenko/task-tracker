import { DateTime } from 'luxon';

export const formatMills = (date: any): string => DateTime.fromMillis(date).toFormat('d LLL, HH:mm');

export const dateFromMillis = (milliseconds: number): string =>
  DateTime.fromMillis(milliseconds).setZone('UTC+0').toFormat('HH:mm:ss');
