import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// hooks
import { useTasks } from '../../../hooks/useTasks';
import { useTags } from '../../../hooks/useTags';
import { useAuth } from '../../../hooks/useAuth';
// redux
import { useSelector } from 'react-redux';
import { selectTasks, selectActiveTask } from '../../../store/reducers/tasks/selectors';
// component
import Title from '../../../components/Title/Title';
import TaskRow from './TaskRow';
import Button from '../../../components/Button/Button';
import Loader from '../../../components/Loader/Loader';
import ActiveTask from '../../../components/Task/ActiveTask/ActiveTask';
import TagList from '../../../components/Tags/TagList';
// styles
import { basicStyles } from '../../../theme/basicStyles';
import { Icon } from 'native-base';
// routes
import { tasksRoutes } from '../../../navigation/routes';
import { ITag } from '../../../store/type';

interface IListTask {
  navigation: { navigate: Function };
}

const ListTask: FC<IListTask> = ({ navigation }) => {
  const tasks = useSelector(selectTasks);
  const activeTask = useSelector(selectActiveTask);
  const {
    isLoading,
    fetchTasks,
    pauseTask,
    addActiveTask,
    startTask,
    deleteTask,
    fakeTasks,
    removeTasks,
    createTask,
  } = useTasks();

  const { fetchTags, filterTags } = useTags();
  const { logout } = useAuth();

  const [filteredTags, setFilteredTags] = useState<{ isFiltered: boolean; tags: ITag }>({
    isFiltered: false,
    tags: [],
  });
  const isListEmpty = useMemo(() => tasks.length > 0, [tasks]);

  useEffect(() => {
    filteredTags.isFiltered ? filterTags(filteredTags.tags) : fetchTasks();
    return removeTasks;
  }, [filteredTags]);

  useEffect(() => {
    addActiveTask(tasks);
    fetchTags();
  }, [tasks]);

  const setFilter = useCallback((tags: ITag) => {
    setFilteredTags({ isFiltered: tags.length > 0, tags });
  }, []);

  const handleFilter = useCallback(() => {
    navigation.navigate(tasksRoutes.FILTERS, { setFilter, filteredTags: filteredTags.tags });
  }, [navigation, setFilter, filteredTags]);

  const removeFilterTag = useCallback(
    (value) => {
      const newFilteredTags = filteredTags.tags.filter((tag) => value !== tag);
      setFilteredTags({ tags: newFilteredTags, isFiltered: newFilteredTags.length > 0 });
    },
    [filteredTags],
  );

  return (
    <View style={basicStyles.bgScreen}>
      <Loader isLoading={isLoading}>
        <View style={[basicStyles.container, basicStyles.fullScreen]}>
          <View style={[basicStyles.header, basicStyles.screenHeader]}>
            <View style={basicStyles.flexRow}>
              <Title text='Tasks' />
              <TouchableOpacity onPress={handleFilter}>
                <Icon
                  type='MaterialCommunityIcons'
                  name='filter-variant'
                  style={[styles.filterIcon, filteredTags.isFiltered && basicStyles.dangerText]}
                />
              </TouchableOpacity>
            </View>
            <Text onPress={logout} style={basicStyles.dangerText}>
              Log out
            </Text>
          </View>
          {!isListEmpty && !filteredTags.isFiltered ? (
            <View style={styles.emptyList}>
              <Text style={styles.emptyListText}>You don’t have tasks recently added.</Text>
              <Text style={styles.emptyListText} onPress={fakeTasks}>
                Generate list of tasks
              </Text>
            </View>
          ) : (
            <>
              {filteredTags.isFiltered && <TagList tags={filteredTags.tags} remove={removeFilterTag} />}
              {!isListEmpty && filteredTags.isFiltered ? (
                <View style={styles.emptyList}>
                  <Text style={styles.emptyListText}>Not found tasks</Text>
                </View>
              ) : (
                <View style={styles.list}>
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
                  {activeTask ? (
                    <ActiveTask activeTask={activeTask} pause={pauseTask} />
                  ) : (
                    <Button title='Add task' onPress={() => navigation.navigate(tasksRoutes.CREATE, { createTask })} />
                  )}
                </View>
              )}
            </>
          )}
        </View>
      </Loader>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyList: { justifyContent: 'center', flex: 1, alignItems: 'center', height: '100%' },
  emptyListText: { textAlign: 'center' },
  text: {
    fontSize: 26,
  },
  filterIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  list: { justifyContent: 'space-between', flex: 1 },
});

export default ListTask;
