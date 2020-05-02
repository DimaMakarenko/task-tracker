import React, { FC, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTasks } from '../../../hooks/useTasks';
import { useTags } from '../../../hooks/useTags';
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
import { Icon } from 'native-base';
// routes
import { tasksRoutes } from '../../../navigation/routes';

interface IListTask {
  navigation: { navigate: Function };
}

const ListTask: FC<IListTask> = ({ navigation }) => {
  const tasks = useSelector(selectTasks);
  const activeTask = useSelector(selectActiveTask);
  const { isLoading, fetchTasks, pauseTask, addActiveTask, startTask, deleteTask } = useTasks();
  const { fetchTags } = useTags();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    addActiveTask(tasks);
  }, [tasks]);

  useEffect(() => {
    fetchTags(tasks);
  }, [tasks]);

  const handlePress = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <View style={basicStyles.container}>
        <View style={styles.headerWrapper}>
          <View>
            <View style={styles.header}>
              <View style={basicStyles.flexRow}>
                <Title text='Tasks' />
                <TouchableOpacity onPress={() => navigation.navigate(tasksRoutes.FILTERS)}>
                  <Icon type='MaterialCommunityIcons' name='filter-variant' style={styles.filterIcon} />
                </TouchableOpacity>
              </View>
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
                  renderItem={({ item }: { item: any }) => (
                    <TaskRow
                      task={item}
                      navigate={navigation.navigate}
                      pauseTask={pauseTask}
                      startTask={startTask}
                      deleteTask={deleteTask}
                      activeTask={activeTask}
                    />
                  )}
                />
              </View>
            )}
          </View>
          {activeTask ? (
            <ActiveTask activeTask={activeTask} pause={pauseTask} />
          ) : (
            <Button title='Add task' onPress={() => navigation.navigate(tasksRoutes.CREATE)} />
          )}
        </View>
      </View>
    </>
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
  filterIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default ListTask;
