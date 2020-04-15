import { useRef, useState } from 'react';

interface IUseTick {}

export const useTick: IUseTick = (time) => {
  const [timer, setTimer] = useState(time);
  const timerTime = useRef(null);

  const startTimer = () => {
    timerTime.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timerTime.current);
  };

  return { timer, startTimer, stopTimer };
};
