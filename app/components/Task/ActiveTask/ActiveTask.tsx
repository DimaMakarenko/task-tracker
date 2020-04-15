import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// redux
import { formatSeconds } from '../../../utils/time';
interface IActiveTask {
  index: number;
  duration: number;
  id: number;
  tickTaskTimer: Function;
  style: any;
}

const ActiveTask: React.FC<IActiveTask> = ({ index, duration, id, style, tickTaskTimer }) => {
  setInterval(() => {
    tickTaskTimer(id);
  }, 1000);
  return (
    <View style={[styles.activeTask, style]}>
      <Text>Task#{index}</Text>
      <Text>{formatSeconds(duration)}</Text>
      <Text>pause</Text>
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
