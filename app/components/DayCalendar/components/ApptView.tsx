import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// component
import { Icon } from 'native-base';
// @ts-ignore
import tinycolor from 'tinycolor2';
// @ts-ignore
import Colors from 'rnschedule/src/constants/colors';
// @ts-ignore
import { hrsToStart } from 'rnschedule/src/services/hrsToPx';
// types
import { TAppt } from '../type';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// utils
import { durationFromMills } from '../../../utils/time';

interface IApptView {
  topTime: Date;
  appt: TAppt;
  hour_size: number;
  onEventPress: (arg0: TAppt) => void;
}

const ApptView: React.FC<IApptView> = ({ topTime, appt, hour_size, onEventPress }) => {
  const color = tinycolor(appt.color).isValid() ? tinycolor(appt.color).toHexString() : Colors.red;
  const margin = hrsToStart(appt.start, topTime) * hour_size;

  return (
    <View
      style={{
        flex: 1,
        marginTop: margin,
        height: appt.height,
        // minHeight: 35,
        backgroundColor: color,
        borderRadius: 5,
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <TouchableOpacity onPress={() => onEventPress(appt)} style={[basicStyles.flexRow, styles.content]}>
        <Text style={[{ fontWeight: '600' }, tinycolor(color).isDark() && { color: 'white' }]}>{appt.title}</Text>
        <Text style={[{ fontWeight: '600' }, tinycolor(color).isDark() && { color: 'white' }]}>
          {durationFromMills(appt.duration)}
        </Text>
        <Icon type='MaterialCommunityIcons' name='pencil' style={[basicStyles.icon, { fontSize: 18 }]} />
      </TouchableOpacity>
    </View>
  );
};

export default ApptView;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
