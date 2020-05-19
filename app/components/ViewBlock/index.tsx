import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// styles
import { basicStyles } from '../../theme/basicStyles';

interface IViewBox {
  title: string;
  text: string;
}

const ViewBox: React.FC<IViewBox> = ({ title, text }) => {
  return (
    <View style={styles.block}>
      <Text style={basicStyles.subTitle}>{title}</Text>
      <Text style={basicStyles.text}>{text}</Text>
    </View>
  );
};

export default ViewBox;

const styles = StyleSheet.create({
  block: { marginBottom: 30 },
});
