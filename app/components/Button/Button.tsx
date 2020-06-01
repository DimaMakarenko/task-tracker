import React from 'react';
import { View, Text } from 'react-native';
// style
import { Button as RNPButton } from 'react-native-paper';
import { styles } from './styles';

interface IButton {
  title: string;
  onPress: Function;
  loading?: boolean;
  style?: object;
  testID?: string;
}

const Button: React.FC<IButton> = ({ title, onPress, loading, style, testID }) => {
  return (
    <View style={style}>
      <RNPButton
        contentStyle={styles.button}
        uppercase={false}
        labelStyle={styles.text}
        color='#fff'
        mode='text'
        loading={loading}
        onPress={() => onPress()}
        testID={testID}
      >
        <Text>{title}</Text>
      </RNPButton>
    </View>
  );
};

export default Button;
