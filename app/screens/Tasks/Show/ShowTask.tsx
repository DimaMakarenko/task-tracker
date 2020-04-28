import React, { useMemo, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
// interfaces
import { ITask } from '../../../store/type';
// components
import Title from '../../../components/Title/Title';
import { alert } from '../../../components/Alert/Alert';
import Button from '../../../components/Button/Button';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// utils
import { dateFromMillis, lastSessionEnd, durationFromMills } from '../../../utils/time';
// images
import SvgUri from 'react-native-svg-uri';
import { editImg, pauseImg, playImg } from '../../../assets';
import { useTaskAction } from '../../../hooks/useTaskAction';

interface IShowTask {
  navigation: { navigate: Function };
  route: {
    params: {
      taskId: number;
      deleteTask: Function;
      handleEdit: Function;
      handlePause: Function;
      handleStart: Function;
    };
  };
}

const ShowTask: React.FC<IShowTask> = ({ navigation, route }) => {
  const { taskId, deleteTask, handleEdit, handlePause, handleStart } = route.params;

  const { finishTask, getTask } = useTaskAction();

  const currentTask = getTask(taskId);
  const { id, title, duration, project, startTimer, timeSession, isActive, isFinished } = currentTask;

  const handleDelete = useCallback(() => {
    deleteTask(id);
    navigation.navigate('List');
  }, [navigation, deleteTask, id]);

  const lastEnd = useMemo(() => {
    return lastSessionEnd(timeSession, isActive);
  }, [timeSession, isActive]);

  const showAlert = useCallback(() => {
    alert('Deleting task', 'You really want delete this task?', handleDelete);
  }, [handleDelete]);

  const makeFinished = useCallback(() => {
    finishTask(currentTask);
  }, []);

  return (
    <View style={basicStyles.container}>
      <View style={styles.header}>
        <Title text='Task' />
        {!isFinished && (
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => handleEdit()} style={styles.optionIcon}>
              <SvgUri source={editImg} />
            </TouchableOpacity>
            {isActive ? (
              <TouchableOpacity style={styles.optionIcon} onPress={() => handlePause()}>
                <SvgUri source={pauseImg} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.optionIcon} onPress={() => handleStart()}>
                <SvgUri source={playImg} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={styles.block}>
        <Text style={basicStyles.subTitle}>Title</Text>
        <Text style={basicStyles.text}>{title}</Text>
      </View>
      <View style={styles.block}>
        <Text style={basicStyles.subTitle}>Project</Text>
        <Text style={basicStyles.text}>{project}</Text>
      </View>

      <View style={[styles.block, styles.timeBlock]}>
        <View>
          <Text style={basicStyles.subTitle}>Start time</Text>
          <Text style={basicStyles.text}>{dateFromMillis(startTimer)}</Text>
        </View>
        {lastEnd && (
          <View>
            <Text style={basicStyles.subTitle}>End time</Text>
            <Text style={basicStyles.text}>{dateFromMillis(lastEnd)}</Text>
          </View>
        )}
      </View>
      <View style={styles.block}>
        <Text style={basicStyles.subTitle}>Duration</Text>
        <Text style={basicStyles.text}>{durationFromMills(duration)} h</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.deleteBtn} onPress={showAlert}>
          Delete
        </Text>
      </View>
      {!isFinished && <Button title='Mark as Completed' onPress={makeFinished} />}
    </View>
  );
};

const styles = StyleSheet.create({
  block: { marginBottom: 30 },
  timeBlock: { flexDirection: 'row', justifyContent: 'space-between' },
  deleteBtn: { fontSize: 12, color: 'rgba(218, 11, 11,0.6)' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 45 },
  optionIcon: { marginLeft: 14 },
  icons: { flexDirection: 'row' },
});

export default ShowTask;
