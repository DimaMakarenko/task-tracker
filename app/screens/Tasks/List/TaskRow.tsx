import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ITaskRow {
  title: string;
  index: number;
  duration: number;
}

const TaskRow: React.FC<ITaskRow> = ({ title, index, duration }) => {
  return (
    <View style={styles.taskRow}>
      <Text style={styles.title}>
        Task #{index} {title}
      </Text>
      <Text style={styles.duration}>{duration}</Text>
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
