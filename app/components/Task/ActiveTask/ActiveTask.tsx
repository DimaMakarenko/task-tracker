import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
// utils
import { lastSessionStart, durationFromMills } from '../../../utils/time';
// types
import { ITask } from '../../../store/type';
// image
import { Icon } from 'native-base';
// style
import { basicStyles } from '../../../theme/basicStyles';
import { Colors } from '../../../theme/colors';

interface IActiveTask {
  pause: Function;
  activeTask: ITask;
}

const screenWidth = Dimensions.get('window').width;

const ActiveTask: React.FC<IActiveTask> = ({ activeTask, pause }) => {
  const { title, duration, timeSession } = activeTask;
  const [timer, setTimer] = useState(duration);

  const pauseTask = useCallback(() => {
    pause({ task: activeTask });
  }, [activeTask, pause]);

  useEffect(() => {
    let internal: any = null;
    internal = setInterval(() => {
      setTimer(duration + Date.now() - lastSessionStart(timeSession));
    }, 1000);
    return () => clearInterval(internal);
  }, [activeTask, duration, timeSession]);

  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.activeTask]}>
        <Text>{title}</Text>
        <Text>{durationFromMills(timer)}</Text>
        <TouchableOpacity onPress={pauseTask} style={styles.image}>
          <Icon type='MaterialCommunityIcons' name='pause-circle' style={basicStyles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginLeft: -24, marginBottom: -24, width: screenWidth },
  activeTask: {
    paddingHorizontal: 24,
    height: 70,
    width: '100%',
    backgroundColor: Colors.active,
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
