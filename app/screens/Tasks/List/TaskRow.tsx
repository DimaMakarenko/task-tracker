import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// utils
import { dateFromMillis, formatMills } from '../../../utils/time';

interface ITaskRow {
  title: string;
  isActive: boolean;
  startTimer: number;
  duration: number;
}

const TaskRow: React.FC<ITaskRow> = ({ title, duration, isActive, startTimer }) => {
  return (
    <View style={styles.taskRow}>
      <Text style={styles.title}>Task {title}</Text>
      <Text style={styles.duration}>{isActive ? formatMills(startTimer) : dateFromMillis(duration)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  title: {},
  duration: {},
});

export default TaskRow;
