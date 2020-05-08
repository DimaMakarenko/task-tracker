import React from 'react';
import { View, Text } from 'react-native';
// styles
import { styles } from './styles';

interface IText {
  text: string;
  style?: object;
}

const Title: React.FC<IText> = ({ text, style }) => {
  return (
    <View style={[styles.title, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Title;
