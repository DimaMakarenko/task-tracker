export interface ITask {
  id: number;
  title: string;
  project: string;
  duration: number;
  isPaused: boolean;
  isDone: boolean;
  timerStart: number;
  timeSession?: { start: number; end: number }[];
  tags?: string[];
  file?: any;
}
