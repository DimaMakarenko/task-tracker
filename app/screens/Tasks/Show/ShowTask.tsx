import React from 'react';
import { Text, View } from 'react-native';

interface IShowTask {}

const ShowTask: React.FC<IShowTask> = () => {
  return (
    <View>
      <Text>Show task</Text>
    </View>
  );
};

export default ShowTask;
