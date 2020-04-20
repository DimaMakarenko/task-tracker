import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { ITask } from '../../../types/store';
// components
import Title from '../../../components/Title/Title';
// styles
import { basicStyles } from '../../../theme/basicStyles';
import { formatMills, dateFromMillis } from '../../../utils/time';

interface IShowTask {
  route: {
    params: ITask;
  };
}

const ShowTask: React.FC<IShowTask> = ({ route }) => {
  const { title, project, startTimer, duration } = route.params;
  const showAlert = () => {
    Alert.alert('Deleting task', 'You really want delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          console.log('delete');
        },
      },
    ]);
  };
  return (
    <View style={basicStyles.container}>
      <Title text='Task' />
      <View style={styles.block}>
        <Text style={styles.subTitle}>Title</Text>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.subTitle}>Project</Text>
        <Text style={styles.text}>{project}</Text>
      </View>

      <View style={[styles.block, styles.timeBlock]}>
        <View>
          <Text style={styles.subTitle}>Start time</Text>
          <Text style={styles.text}>{formatMills(startTimer)}</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>End time</Text>
          <Text style={styles.text}>{formatMills(startTimer + duration)}</Text>
        </View>
      </View>
      <View style={styles.block}>
        <Text style={styles.subTitle}>Duration</Text>
        <Text style={styles.text}>{dateFromMillis(duration)} h</Text>
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
  subTitle: { fontSize: 12, lineHeight: 18, opacity: 0.54 },
  text: { fontSize: 14, lineHeight: 21 },
  deleteBtn: { fontSize: 12, color: 'rgba(218, 11, 11,0.6)' },
});

export default ShowTask;
