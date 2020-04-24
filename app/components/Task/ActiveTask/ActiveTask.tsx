import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
// utils
import { dateFromMillis } from '../../../utils/time';
// types
import { ITask } from '../../../store/type';

interface IActiveTask {
  pause: Function;
  activeTask: ITask;
  uid: string;
}

const pauseImage = require('../../../assets/images/pause.png');

const ActiveTask: React.FC<IActiveTask> = ({ activeTask, pause, uid }) => {
  const { title, startTimer } = activeTask;
  const [timer, setTimer] = useState(Date.now() - startTimer);

  const pauseTask = () => {
    pause({ uid, task: activeTask });
  };

  useEffect(() => {
    let internal: any = null;
    internal = setInterval(() => {
      setTimer(Date.now() - startTimer);
    }, 1000);
    return () => clearInterval(internal);
  }, [startTimer]);

  return (
    <View style={[styles.activeTask]}>
      <Text>{title}</Text>
      <Text>{dateFromMillis(timer)}</Text>
      <TouchableOpacity onPress={pauseTask} style={styles.image}>
        <Image source={pauseImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  activeTask: {
    height: 85,
    backgroundColor: '#E9E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default ActiveTask;
