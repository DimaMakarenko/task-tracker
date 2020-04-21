import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, Animated, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// utils
import { dateFromMillis, formatMills } from '../../../utils/time';
import { RectButton } from 'react-native-gesture-handler';

interface ITaskRow {
  task: {
    title: string;
    isActive: boolean;
    startTimer: number;
    duration: number;
  };
  navigate: Function;
}
// images
const deleteImg = require('../../../assets/image/trash.png');
const editImg = require('../../../assets/image/edit.png');

const TaskRow: React.FC<ITaskRow> = ({ task, navigate }) => {
  const { title, duration, isActive, startTimer } = task;

  const renderLeftActions = () => {
    return (
      <RectButton style={styles.option}>
        <TouchableOpacity onPress={() => console.log('delete')} style={styles.optionIcon}>
          <Image source={deleteImg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('edit')} style={styles.optionIcon}>
          <Image source={editImg} />
        </TouchableOpacity>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderLeftActions}>
      <TouchableOpacity style={styles.taskRow} onPress={() => navigate('Show', task)}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{isActive ? formatMills(startTimer) : dateFromMillis(duration)}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {},
  duration: {},
  option: { alignItems: 'center', flexDirection: 'row' },
  optionIcon: { marginLeft: 20 },
});

export default TaskRow;
