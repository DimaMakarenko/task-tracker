import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// interfaces
import { ITask } from '../../../types/store';
// redux
// components
import Title from '../../../components/Title/Title';
import { alert } from '../../../components/Alert/Alert';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface IShowTask {
  navigation: { navigate: Function };
  route: {
    params: ITask;
  };
}

const ShowTask: React.FC<IShowTask> = ({ navigation, route }) => {
  const { id } = route.params;

  const handleClick = () => {
    console.log('delete');
    navigation.navigate('List');
  };

  const showAlert = () => alert('Deleting task', 'You really want delete this task?', handleClick);

  return (
    <View style={basicStyles.container}>
      <Title text='Task' />
      <View style={styles.block}>
        <Text style={basicStyles.subTitle}>Title</Text>
        <Text style={basicStyles.text}>{id}</Text>
      </View>
      <View style={styles.block}>
        <Text style={basicStyles.subTitle}>Project</Text>
        <Text style={basicStyles.text}>{id}</Text>
      </View>

      <View style={[styles.block, styles.timeBlock]}>
        <View>
          <Text style={basicStyles.subTitle}>Start time</Text>
          <Text style={basicStyles.text}>{id}</Text>
        </View>
        <View>
          <Text style={basicStyles.subTitle}>End time</Text>
          <Text style={basicStyles.text}>{id}</Text>
        </View>
      </View>
      <View style={styles.block}>
        <Text style={basicStyles.subTitle}>Duration</Text>
        <Text style={basicStyles.text}>{id} h</Text>
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
