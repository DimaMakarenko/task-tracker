import React, { useMemo, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
// interfaces
import { ITask } from '../../../store/type';
// components
import Title from '../../../components/Title/Title';
import { alert } from '../../../components/Alert/Alert';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// utils
import { dateFromMillis, lastSessionEnd } from '../../../utils/time';

interface IShowTask {
  navigation: { navigate: Function };
  route: {
    params: {
      task: ITask;
      deleteTask: Function;
    };
  };
}

const ShowTask: React.FC<IShowTask> = ({ navigation, route }) => {
  const { task, deleteTask } = route.params;
  const { id, title, duration, project, startTimer, timeSession, isActive } = task;

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

  return (
    <View style={basicStyles.container}>
      <Title text='Task' />
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
        <Text style={basicStyles.text}>{dateFromMillis(duration)} h</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.deleteBtn} onPress={showAlert}>
          Delete
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: { marginBottom: 30 },
  timeBlock: { flexDirection: 'row', justifyContent: 'space-between' },
  deleteBtn: { fontSize: 12, color: 'rgba(218, 11, 11,0.6)' },
});

export default ShowTask;
