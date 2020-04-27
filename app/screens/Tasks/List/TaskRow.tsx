import React, { useCallback } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
// redux
import { useTaskAction } from '../../../hooks/useTaskAction';
// components
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { alert } from '../../../components/Alert/Alert';
// types
import { ITask } from '../../../store/type';
// utils
import { dateFromMillis, formatMills } from '../../../utils/time';
// images
import { deleteImg, editImg, playImg, completeImg, pauseImg } from '../../../assets';
import SvgUri from 'react-native-svg-uri';

interface ITaskRow {
  task: ITask;
  navigate: Function;
}

const TaskRow: React.FC<ITaskRow> = ({ task, navigate }) => {
  const { title, duration, isActive, isFinished, startTimer } = task;
  const { pauseTask, startTask } = useTaskAction();

  const handleDelete = useCallback(() => {
    console.log('delete');
  }, []);

  const handleEdit = useCallback(() => {
    navigate('Edit', task);
  }, [task, navigate]);

  const handlePause = useCallback(() => {
    pauseTask({ task });
  }, [task, pauseTask]);

  const handleStart = useCallback(() => {
    startTask(task);
  }, [task, startTask]);

  const showAlert = useCallback(() => {
    alert('Deleting task', 'You really want delete this task?', handleDelete);
  }, []);

  const renderLeftActions = () => {
    return (
      <RectButton style={styles.option}>
        <TouchableOpacity onPress={showAlert} style={styles.optionIcon}>
          <SvgUri source={deleteImg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit} style={styles.optionIcon}>
          <SvgUri source={editImg} />
        </TouchableOpacity>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderLeftActions}>
      <View style={styles.taskRow}>
        <TouchableOpacity style={styles.taskInfo} onPress={() => navigate('Show', task)}>
          <Text>{title}</Text>
          <View style={styles.row}>
            <Text>{isActive ? formatMills(startTimer) : dateFromMillis(duration)}</Text>
          </View>
        </TouchableOpacity>
        {isFinished ? (
          <TouchableOpacity style={styles.image}>
            <SvgUri source={completeImg} />
          </TouchableOpacity>
        ) : (
          <>
            {isActive ? (
              <TouchableOpacity style={styles.image} onPress={handlePause}>
                <SvgUri source={pauseImg} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.image} onPress={handleStart}>
                <SvgUri source={playImg} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
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
  taskInfo: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { marginLeft: 14 },
  option: { alignItems: 'center', flexDirection: 'row' },
  optionIcon: { marginLeft: 20 },
});

export default TaskRow;
