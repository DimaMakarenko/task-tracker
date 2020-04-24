import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// components
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { alert } from '../../../components/Alert/Alert';
// types
import { ITask } from '../../../store/type';
// utils
import { dateFromMillis } from '../../../utils/time';

interface ITaskRow {
  task: ITask;
  navigate: Function;
}

// images
const deleteImg = require('../../../assets/images/trash.png');
const editImg = require('../../../assets/images/edit.png');

const TaskRow: React.FC<ITaskRow> = ({ task, navigate }) => {
  const { title, duration } = task;

  const handleDelete = () => console.log('delete');
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
        <Text style={styles.duration}>{dateFromMillis(duration)}</Text>
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
