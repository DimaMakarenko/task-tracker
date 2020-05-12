import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
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
      {onRemove && (
        <TouchableOpacity onPress={() => onRemove(title)}>
          <View>
            <Icon type='MaterialCommunityIcons' name='close-circle' style={styles.icon} />
          </View>
        </TouchableOpacity>
      )}
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
