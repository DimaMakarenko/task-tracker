import { useState, useCallback } from 'react';
// api
import { listenerTaskDb } from '../db/api';

export const useCalendar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dayData = useCallback(() => {}, []);
  return {
    isLoading,
  };
};
