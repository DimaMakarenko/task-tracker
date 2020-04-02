import React from 'react';
import {View, Text} from 'react-native';
// style
import {Button as RNPButton} from 'react-native-paper';
import {styles} from './styles';

interface IButton {
  text: string;
}

const Button: React.FC<IButton> = ({text}) => {
  return (
    <View>
      <RNPButton
        contentStyle={styles.button}
        uppercase={false}
        labelStyle={styles.text}
        color="#fff"
        mode="text"
        onPress={() => {
          console.log('click', text);
        }}>
        <Text>{text}</Text>
      </RNPButton>
    </View>
  );
};

export default Button;
