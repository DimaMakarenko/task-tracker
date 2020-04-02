import React from 'react';
import {View, Text} from 'react-native';
// styles
import {styles} from './styles';

interface IText {
  text: string;
}

const Title: React.FC<IText> = ({text}) => {
  return (
    <View style={styles.title}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Title;
