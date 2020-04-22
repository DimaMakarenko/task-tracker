import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// redux
import { useDispatch } from 'react-redux';
// components
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { alert } from '../../../components/Alert/Alert';
// utils
import { dateFromMillis, formatMills } from '../../../utils/time';
import { deleteTask } from '../../../store/reducers/tasks';

interface ITaskRow {
  task: {
    title: string;
    isActive: boolean;
    startTimer: number;
    duration: number;
    id: number;
  };
  navigate: Function;
}

// images
const deleteImg = require('../../../assets/image/trash.png');
const editImg = require('../../../assets/image/edit.png');

const TaskRow: React.FC<ITaskRow> = ({ task, navigate }) => {
  const { title, duration, isActive, startTimer, id } = task;
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(id));
  const handleEdit = () => navigate('Edit', task);

  const showAlert = () => alert('Deleting task', 'You really want delete this task?', handleDelete);

  const renderLeftActions = () => {
    return (
      <RectButton style={styles.option}>
        <TouchableOpacity onPress={showAlert} style={styles.optionIcon}>
          <Image source={deleteImg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit} style={styles.optionIcon}>
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
