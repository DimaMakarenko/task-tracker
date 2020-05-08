import React from 'react';
import { StyleSheet, View } from 'react-native';
// component
import Tag from './Tag';
// types
import { ITag, ITagFunc } from '../../store/type';

interface ITagList {
  tags: ITag;
  add?: ITagFunc;
  remove?: ITagFunc;
}

const TagList: React.FC<ITagList> = ({ tags, add, remove }) => {
  return (
    <View style={styles.tagsWrapper}>
      {tags.map((tag) => (
        <Tag title={tag} onAdd={add} onRemove={remove} key={tag} />
      ))}
    </View>
  );
};

export default TagList;

const styles = StyleSheet.create({
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 45,
  },
});
