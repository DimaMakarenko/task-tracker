import React, { FC } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// redux
import { connect } from 'react-redux';
import firebase from 'firebase';
// component
import Title from '../../../components/Title/Title';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface IListTask {
  tasks: object[];
}

const ListTask: FC<IListTask> = ({ tasks }) => {
  console.log(tasks);
  const handlePress = () => {
    firebase.auth().signOut();
  };
  return (
    <View style={basicStyles.container}>
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
          <FlatList data={tasks} renderItem={({ item }) => <Text>1 {item}</Text>} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tasks: {},
  emptyList: { justifyContent: 'center', alignItems: 'center', height: '100%' },
  emptyListText: { textAlign: 'center' },
  logOut: { color: 'rgba(218, 11, 11,0.6)' },
  text: {
    fontSize: 26,
  },
});

export default connect((state) => ({ tasks: state.tasks }))(ListTask);
