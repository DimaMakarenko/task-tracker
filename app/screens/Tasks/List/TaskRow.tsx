import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
// utils
import { dateFromMillis, formatMills } from '../../../utils/time';

interface ITaskRow {
  task: {
    title: string;
    isActive: boolean;
    startTimer: number;
    duration: number;
  };
  navigate: Function;
}

const TaskRow: React.FC<ITaskRow> = ({ task, navigate }) => {
  const { title, duration, isActive, startTimer } = task;
  return (
    <TouchableOpacity style={styles.taskRow} onPress={() => navigate('Show', task)}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.duration}>{isActive ? formatMills(startTimer) : dateFromMillis(duration)}</Text>
    </TouchableOpacity>
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
