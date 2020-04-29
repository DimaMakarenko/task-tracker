import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

interface ITagContainer {
  title: string;
  onRemove?: (title: string) => void;
  onAdd?: (title: string) => void;
}

const TagContainer: React.FC<ITagContainer> = ({ title, onRemove, onAdd }) => {
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

export default TagContainer;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E9E5E5',
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
