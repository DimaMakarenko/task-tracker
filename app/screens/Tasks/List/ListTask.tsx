import React, { FC, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTaskAction } from '../../../hooks/useTaskAction';
// db
import firebase from 'firebase';
// redux
import { useSelector } from 'react-redux';
import { selectTasks, selectActiveTask } from '../../../store/reducers/tasks/selectors';
// component
import Title from '../../../components/Title/Title';
import TaskRow from './TaskRow';
import Button from '../../../components/Button/Button';
import Loader from '../../../components/Loader/Loader';
import ActiveTask from '../../../components/Task/ActiveTask/ActiveTask';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface IListTask {
  navigation: { navigate: Function };
}

const ListTask: FC<IListTask> = ({ navigation }) => {
  const tasks = useSelector(selectTasks);
  const activeTask = useSelector(selectActiveTask);
  const { isLoading, fetchTasks, addActiveTask, pauseTask } = useTaskAction();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    addActiveTask(tasks);
  }, [tasks]);

  const handlePress = () => {
    firebase.auth().signOut();
  };

  return (
    <Loader isLoading={isLoading}>
      <View style={basicStyles.container}>
        <View style={styles.headerWrapper}>
          <View>
            <View style={styles.header}>
              <Title text='Tasks' />
              <Text onPress={handlePress} style={styles.logOut}>
                Log out
              </Text>
            </View>
            {tasks.length === 0 ? (
              <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>You don’t have tasks recently added.</Text>
                <Text style={styles.emptyListText}>Generate list of tasks</Text>
              </View>
            ) : (
              <View style={styles.tasks}>
                <FlatList
                  data={tasks}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }: { item: any }) => <TaskRow task={item} navigate={navigation.navigate} />}
                />
              </View>
            )}
          </View>
          {activeTask ? (
            <ActiveTask activeTask={activeTask} pause={pauseTask} />
          ) : (
            <Button title='Add task' onPress={() => navigation.navigate('Create')} />
          )}
        </View>
      </View>
    </Loader>
  );
};

const styles = StyleSheet.create({
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tasks: {},
  headerWrapper: { height: '100%', justifyContent: 'space-between' },
  emptyList: { justifyContent: 'center', alignItems: 'center', height: '100%' },
  emptyListText: { textAlign: 'center' },
  logOut: { color: 'rgba(218, 11, 11,0.6)' },
  text: {
    fontSize: 26,
  },
});

export default ListTask;
