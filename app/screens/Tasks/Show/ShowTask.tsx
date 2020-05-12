import React, { useMemo, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTasks } from '../../../hooks/useTasks';
// components
import Title from '../../../components/Title/Title';
import { alert } from '../../../components/Alert/Alert';
import Button from '../../../components/Button/Button';
import TagList from '../../../components/Tags/TagList';
import { Icon } from 'native-base';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// utils
import { dateFromMillis, lastSessionEnd, durationFromMills, formatMills } from '../../../utils/time';
// routes
import { tasksRoutes } from '../../../navigation/routes';

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

  const { finishTask, getTask } = useTasks();

  const currentTask = getTask(taskId);

  const { id, title, duration, project, startTimer, timeSession, isActive, isFinished, tags } = currentTask;

  const handleDelete = useCallback(() => {
    deleteTask(id);
    navigation.navigate(tasksRoutes.LIST);
  }, [navigation, deleteTask, id]);

  const lastEnd = useMemo(() => {
    return lastSessionEnd(timeSession, isActive);
  }, [timeSession, isActive]);

  const showAlert = useCallback(() => {
    alert('Deleting task', 'You really want delete this task?', handleDelete);
  }, [handleDelete]);

  const makeFinished = useCallback(() => {
    finishTask(currentTask);
  }, [currentTask]);

  return (
    <ScrollView>
      <View style={[basicStyles.container, basicStyles.bgScreen]}>
        <View style={[basicStyles.header, basicStyles.screenHeader]}>
          <Title text='Task' />
          {!isFinished && (
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => handleEdit()} style={styles.optionIcon}>
                <Icon type='MaterialCommunityIcons' name='pencil' style={basicStyles.icon} />
              </TouchableOpacity>
              {isActive ? (
                <TouchableOpacity style={styles.optionIcon} onPress={() => handlePause(currentTask)}>
                  <Icon type='MaterialCommunityIcons' name='pause-circle' style={basicStyles.icon} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.optionIcon} onPress={() => handleStart(currentTask)}>
                  <Icon type='MaterialCommunityIcons' name='play-circle' style={basicStyles.icon} />
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
            <Text style={basicStyles.text}>{formatMills(startTimer)}</Text>
          </View>
          {lastEnd && (
            <View>
              <Text style={basicStyles.subTitle}>End time</Text>
              <Text style={basicStyles.text}>{formatMills(lastEnd)}</Text>
            </View>
          )}
        </View>
        <View style={styles.block}>
          <Text style={basicStyles.subTitle}>Duration</Text>
          <Text style={basicStyles.text}>{durationFromMills(duration)} h</Text>
        </View>
        <View style={styles.block}>
          <Text style={basicStyles.subTitle}>Tags</Text>
          {tags && <TagList tags={tags} />}
        </View>

        <View style={styles.block}>
          <Text style={styles.deleteBtn} onPress={showAlert}>
            Delete
          </Text>
        </View>
        {!isFinished && <Button title='Mark as Completed' onPress={makeFinished} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  block: { marginBottom: 30 },
  timeBlock: { flexDirection: 'row', justifyContent: 'space-between' },
  deleteBtn: { fontSize: 12, color: 'rgba(218, 11, 11,0.6)' },
  optionIcon: { marginLeft: 14 },
  icons: { flexDirection: 'row' },
});

export default ShowTask;
