import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
// component
import { Icon } from 'native-base';
// styles
import { basicStyles } from '../../theme/basicStyles';

interface ITouchableIcon {
  name: string;
  onPress: () => void;
  gray?: boolean;
  danger?: boolean;
}

const TouchableIcon: React.FC<ITouchableIcon> = ({ name, onPress, gray, danger }) => {
  return (
    <TouchableOpacity style={styles.optionIcon} onPress={onPress}>
      <Icon
        type='MaterialCommunityIcons'
        name={name}
        style={[basicStyles.icon, gray && basicStyles.grayColor, danger && basicStyles.dangerText]}
      />
    </TouchableOpacity>
  );
};

export default TouchableIcon;

const styles = StyleSheet.create({
  optionIcon: { marginLeft: 14 },
});
