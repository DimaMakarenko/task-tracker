import React, { useMemo, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// redux
import { useSelector } from 'react-redux';
import { selectActiveTask } from '../../../store/reducers/tasks/selectors';
// hooks
import { useTasks } from '../../../hooks/useTasks';
import { useTaskHandler } from '../../../hooks/useTaskHandler';
// components
import Title from '../../../components/Title/Title';
import { alert } from '../../../components/Alert/Alert';
import Button from '../../../components/Button/Button';
import TagList from '../../../components/Tags/TagList';
import { Icon } from 'native-base';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// utils
import { lastSessionEnd, durationFromMills, formatMills } from '../../../utils/time';
// routes
import { tasksRoutes } from '../../../navigation/routes';
// types
import { ITask } from '../../../store/type';

interface IShowTask {
  navigation: { navigate: Function };
  route: {
    params: {
      task: ITask;
    };
  };
}

const ShowTask: React.FC<IShowTask> = ({ navigation, route }) => {
  const { task } = route.params;

  const { handlePause, handleStart } = useTaskHandler();
  const { finishTask, deleteTask } = useTasks();
  const activeTask = useSelector(selectActiveTask);

  const { id, title, duration, project, startTimer, timeSession, isActive, isFinished, tags, file } = task;

  const handleDelete = () => {
    alert('Deleting task', 'You really want delete this task?', () => {
      deleteTask(id);
      navigation.navigate(tasksRoutes.LIST);
    });
  };

  const editTask = useCallback(() => {
    navigation.navigate(tasksRoutes.EDIT, { taskId: id });
  }, [navigation, id]);

  const lastEnd = useMemo(() => {
    return lastSessionEnd(timeSession, isActive);
  }, [timeSession, isActive]);

  const makeFinished = useCallback(() => {
    finishTask(task);
  }, [task]);

  return (
    <ScrollView>
      <View style={[basicStyles.container, basicStyles.bgScreen, basicStyles.fullScreen]}>
        <View style={[basicStyles.header, basicStyles.screenHeader]}>
          <Title text='Task' />
          {!isFinished && (
            <View style={styles.icons}>
              <TouchableOpacity onPress={editTask} style={styles.optionIcon}>
                <Icon type='MaterialCommunityIcons' name='pencil' style={basicStyles.icon} />
              </TouchableOpacity>
              {activeTask && activeTask.id === id ? (
                <TouchableOpacity style={styles.optionIcon} onPress={() => handlePause(task)}>
                  <Icon type='MaterialCommunityIcons' name='pause-circle' style={basicStyles.icon} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.optionIcon} onPress={() => handleStart(task, activeTask)}>
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
        {tags && (
          <View style={styles.block}>
            <Text style={basicStyles.subTitle}>Tags</Text>
            <TagList tags={tags} />
          </View>
        )}

        {file && (
          <View style={styles.block}>
            <Text style={basicStyles.subTitle}>Added file</Text>
            <Text style={basicStyles.text}>{file.fileName}</Text>
          </View>
        )}

        <View style={styles.block}>
          <Text style={styles.deleteBtn} onPress={handleDelete}>
            Delete task
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
