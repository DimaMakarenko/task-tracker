import { DateTime } from 'luxon';
export const formatSeconds = (seconds: number): string => new Date(1000 * seconds).toISOString().substr(11, 8);

export const dateFromSeconds = (seconds: number): string => DateTime.fromSeconds(seconds).toFormat('HH:mm LLL dd');
