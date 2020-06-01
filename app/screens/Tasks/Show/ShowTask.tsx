import React, { useMemo, useCallback, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
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
import ViewBox from '../../../components/ViewBlock';
import TouchableIcon from '../../../components/TouchableIcon';
import DownloadFile from '../../../components/DownloadFile';
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

  const [_isFinished, setIsFinished] = useState(isFinished);

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
    setIsFinished(true);
    finishTask(task);
  }, [task, finishTask]);

  return (
    <View style={[basicStyles.container, basicStyles.bgScreen, basicStyles.fullScreen]} testID='show'>
      <ScrollView>
        <View style={[basicStyles.header, basicStyles.screenHeader]}>
          <Title text='Task' />
          {!_isFinished && (
            <View style={styles.icons}>
              <TouchableIcon name='pencil' onPress={editTask} testID='editIcon' />
              {activeTask && activeTask.id === id ? (
                <TouchableIcon name='pause-circle' onPress={() => handlePause(task)} />
              ) : (
                <TouchableIcon name='play-circle' onPress={() => handleStart(task, activeTask)} />
              )}
            </View>
          )}
        </View>

        <ViewBox title='Title' text={title} />
        <ViewBox title='Project' text={project} />
        <View style={[styles.timeBlock]}>
          <ViewBox title='Start time' text={formatMills(startTimer)} />
          {lastEnd && <ViewBox title='End time' text={formatMills(lastEnd)} />}
        </View>
        <ViewBox title='Duration' text={`${durationFromMills(duration)} h`} />

        {tags && (
          <View style={styles.block}>
            <Text style={basicStyles.subTitle}>Tags</Text>
            <TagList tags={tags} />
          </View>
        )}

        {file && <DownloadFile url={file.fileUrl} name={file.fileName} title='Added file' />}

        {!activeTask && (
          <View style={styles.block}>
            <Text style={styles.deleteBtn} onPress={handleDelete}>
              Delete task
            </Text>
          </View>
        )}

        {!_isFinished && <Button title='Mark as Completed' onPress={makeFinished} />}
      </ScrollView>
    </View>
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
