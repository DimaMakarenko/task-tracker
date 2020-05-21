import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
// component
import TouchableIcon from '../TouchableIcon';
// types
import { ITagFunc } from '../../store/type';
// styles
import { Colors } from '../../theme/colors';

interface ITagContainer {
  title: string;
  onRemove?: ITagFunc;
  onAdd?: ITagFunc;
}

const Tag: React.FC<ITagContainer> = ({ title, onRemove, onAdd }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onAdd ? () => onAdd(title) : undefined} activeOpacity={1}>
      <Text style={styles.text}>{title}</Text>
      {onRemove && <TouchableIcon onPress={() => onRemove(title)} name='close-circle' />}
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.active,
    borderRadius: 15,
    marginRight: 17,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: { fontSize: 16, lineHeight: 21 },
  icon: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
});
