import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// components
import TouchableIcon from '../../TouchableIcon';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// types
import { TWeek } from '../type';
// utils
import { dateToSelect } from '../../../utils/time';

interface IDateSelector {
  next: () => void;
  prev: () => void;
  date: TWeek;
}

const Index: React.FC<IDateSelector> = ({ next, prev, date }) => {
  return (
    <View style={basicStyles.flexRow}>
      <TouchableIcon name='chevron-left' onPress={prev} gray />
      <Text style={[basicStyles.subTitle, styles.text]}>
        {dateToSelect(date.start)} - {dateToSelect(date.end)}
      </Text>
      <TouchableIcon name='chevron-right' onPress={next} gray />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  dateSelector: {},
  text: { alignItems: 'center' },
});
