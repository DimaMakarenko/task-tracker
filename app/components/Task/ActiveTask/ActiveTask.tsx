import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// redux
import { dateFromMillis } from '../../../utils/time';

interface IActiveTask {
  id: number;
  title: string;
  startTimer: number;
  style: any;
  pause: Function;
}

const ActiveTask: React.FC<IActiveTask> = ({ id, title, startTimer, style, pause }) => {
  const [timer, setTimer] = useState(Date.now() - startTimer);

  useEffect(() => {
    let internal: any = null;
    internal = setInterval(() => {
      setTimer(Date.now() - startTimer);
    }, 1000);
    return () => clearInterval(internal);
  }, [startTimer]);

  return (
    <View style={[styles.activeTask, style]}>
      <Text>Task#{title}</Text>
      <Text>{dateFromMillis(timer)}</Text>
      <Text onPress={() => pause()}>pause</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  activeTask: {
    height: 85,
    backgroundColor: '#E9E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ActiveTask;
