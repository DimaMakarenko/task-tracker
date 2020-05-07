import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';
// styles
import { basicStyles } from '../../theme/basicStyles';
// types
import { TWeek } from './type';
// utils
import { dateToSelect } from '../../utils/time';

interface IDateSelector {
  next: () => void;
  prev: () => void;
  date: TWeek;
}

const DateSelector: React.FC<IDateSelector> = ({ next, prev, date }) => {
  return (
    <View style={basicStyles.flexRow}>
      <TouchableOpacity activeOpacity={0.7} onPress={prev}>
        <Icon type='MaterialCommunityIcons' name='chevron-left' style={basicStyles.icon} />
      </TouchableOpacity>
      <Text style={[basicStyles.subTitle, styles.text]}>
        {dateToSelect(date.start)} - {dateToSelect(date.end)}
      </Text>
      <TouchableOpacity activeOpacity={0.7} onPress={next}>
        <Icon type='MaterialCommunityIcons' name='chevron-right' style={basicStyles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  dateSelector: {},
  text: { alignItems: 'center' },
});
