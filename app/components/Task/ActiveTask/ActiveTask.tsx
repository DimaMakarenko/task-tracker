import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
// utils
import { dateFromMillis, lastSessionStart } from '../../../utils/time';
// types
import { ITask } from '../../../store/type';
// image
import { pauseImg } from '../../../assets';

interface IActiveTask {
  pause: Function;
  activeTask: ITask;
}

const ActiveTask: React.FC<IActiveTask> = ({ activeTask, pause }) => {
  const { title, duration, timeSession } = activeTask;
  const [timer, setTimer] = useState(duration);

  const pauseTask = () => {
    pause({ task: activeTask });
  };

  useEffect(() => {
    let internal: any = null;
    internal = setInterval(() => {
      setTimer(duration + Date.now() - lastSessionStart(timeSession));
    }, 1000);
    return () => clearInterval(internal);
  }, [activeTask]);

  return (
    <View style={[styles.activeTask]}>
      <Text>{title}</Text>
      <Text>{dateFromMillis(timer)}</Text>
      <TouchableOpacity onPress={pauseTask} style={styles.image}>
        <Image source={pauseImg} />
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
