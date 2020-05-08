import React, { useCallback } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
// components
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { alert } from '../../../components/Alert/Alert';
import { stopActiveTask } from '../../../components/Toast';
import { Icon } from 'native-base';
// types
import { ITask } from '../../../store/type';
// utils
import { formatMills, durationFromMills } from '../../../utils/time';
// routes
import { tasksRoutes } from '../../../navigation/routes';
import { basicStyles } from '../../../theme/basicStyles';

interface ITaskRow {
  task: ITask;
  navigate: Function;
  pauseTask: Function;
  startTask: Function;
  deleteTask: Function;
  activeTask: ITask | null;
}

const TaskRow: React.FC<ITaskRow> = ({ task, navigate, pauseTask, startTask, deleteTask, activeTask }) => {
  const { id, title, duration, isActive, isFinished, startTimer } = task;

  const handleDelete = useCallback(() => {
    deleteTask(id);
  }, [deleteTask, id]);

  const handlePause = useCallback(
    (pausedTask) => {
      pauseTask({ task: pausedTask });
    },
    [pauseTask],
  );

  const handleStart = useCallback(
    (startedTask) => {
      activeTask ? stopActiveTask() : startTask(startedTask);
    },
    [startTask, activeTask],
  );

  const handleEdit = useCallback(() => {
    navigate(tasksRoutes.EDIT, { task, deleteTask, handleEdit, handlePause, handleStart });
  }, [task, navigate, deleteTask, handlePause, handleStart]);

  const handleShow = useCallback(() => {
    navigate(tasksRoutes.SHOW, { taskId: task.id, deleteTask, handleEdit, handlePause, handleStart });
  }, [task, deleteTask, handleEdit, handlePause, handleStart, navigate]);

  const showAlert = useCallback(() => {
    isActive ? stopActiveTask() : alert('Deleting task', 'Are you really want delete this task?', handleDelete);
  }, [handleDelete, isActive]);

  const renderLeftActions = () => {
    return (
      <RectButton style={styles.option}>
        <TouchableOpacity onPress={showAlert} style={styles.optionIcon}>
          <Icon type='MaterialCommunityIcons' name='trash-can-outline' style={basicStyles.icon} />
        </TouchableOpacity>
        {!isFinished && (
          <TouchableOpacity onPress={handleEdit} style={styles.optionIcon}>
            <Icon type='MaterialCommunityIcons' name='pencil' style={basicStyles.icon} />
          </TouchableOpacity>
        )}
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderLeftActions}>
      <View style={styles.taskRow}>
        <TouchableOpacity style={styles.taskInfo} onPress={handleShow}>
          <Text>{title}</Text>
          <View style={styles.row}>
            <Text>{isActive ? formatMills(startTimer) : durationFromMills(duration)}</Text>
          </View>
        </TouchableOpacity>
        {isFinished ? (
          <TouchableOpacity style={styles.image}>
            <Icon type='MaterialCommunityIcons' name='check-all' style={basicStyles.icon} />
          </TouchableOpacity>
        ) : (
          <>
            {isActive ? (
              <TouchableOpacity style={styles.image} onPress={() => handlePause(task)}>
                <Icon type='MaterialCommunityIcons' name='pause-circle' style={basicStyles.icon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.image} onPress={() => handleStart(task)}>
                <Icon type='MaterialCommunityIcons' name='play-circle' style={basicStyles.icon} />
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
