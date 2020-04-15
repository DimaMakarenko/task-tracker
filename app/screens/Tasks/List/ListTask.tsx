import React, { FC } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// redux
import { useSelector } from 'react-redux';
import { ITask } from '../../../types/store';
import firebase from 'firebase';
// component
import Title from '../../../components/Title/Title';
import TaskRow from './TaskRow';
import Button from '../../../components/Button/Button';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface IListTask {
  navigation: { navigate: Function };
}

interface IUseSelector {
  tasks: ITask[];
}
const ListTask: FC<IListTask> = ({ navigation }) => {
  const tasks: any = useSelector<IUseSelector>((state) => state.tasks);

  const handlePress = () => {
    firebase.auth().signOut();
  };
  return (
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
                renderItem={({ item, index }: { item: ITask; index: number }) => (
                  <TaskRow {...item} index={tasks.length - index} />
                )}
              />
            </View>
          )}
        </View>
      </View>
      <Button title='Add task' onPress={() => navigation.navigate('Create')} style={styles.btn} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tasks: {},
  btn: { position: 'absolute', bottom: 0, width: '100%' },
  headerWrapper: { height: '100%', justifyContent: 'space-between' },
  emptyList: { justifyContent: 'center', alignItems: 'center', height: '100%' },
  emptyListText: { textAlign: 'center' },
  logOut: { color: 'rgba(218, 11, 11,0.6)' },
  text: {
    fontSize: 26,
  },
});

export default ListTask;
