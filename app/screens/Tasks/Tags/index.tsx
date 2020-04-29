import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// redux
import { useSelector } from 'react-redux';
import { selectTags } from '../../../store/reducers/tags/selectors';
// component
import TextField from '../../../components/Form/Text/TextField';
import TagContainer from './TagContainer';
import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';
// style
import { basicStyles } from '../../../theme/basicStyles';

interface ITags {
  route: {
    params: {
      values: string[];
      setFieldValue: Function;
    };
  };
}

const Tags: React.FC<ITags> = ({ navigation, route }) => {
  const { values, setFieldValue } = route.params;
  const [tags, setTags] = useState(values ? values : []);
  const [fieldTag, setFieldTag] = useState('44');
  const tagsList = useSelector(selectTags);
  const unUsedTags = tagsList.filter((tag) => (tags.length > 0 ? !tags.includes(tag) : tagsList));

  const remove = useCallback((tagName: string) => {
    setTags((prev) => prev.filter((tag) => tagName !== tag));
  }, []);

  const create = useCallback(() => {
    setTags((prev) => (prev.includes(fieldTag) ? prev : [...prev, fieldTag]));
    setFieldTag('');
  }, [fieldTag]);

  const add = useCallback((tagName: string) => {
    setTags((prev) => [...prev, tagName]);
  }, []);

  const submit = useCallback(() => {
    setFieldValue('tags', tags);
    navigation.navigate('Edit');
  }, [setFieldValue, tags]);

  return (
    <View style={basicStyles.container}>
      <Title text='Add tags' />
      <TextField
        label='Tag'
        value={fieldTag}
        onChangeText={setFieldTag}
        iconName='arrow-right-circle'
        submit={create}
      />
      <View style={styles.tagsWrapper}>
        {tags.map((tag) => (
          <TagContainer title={tag} onRemove={remove} />
        ))}
      </View>
      <View style={[styles.tagsWrapper, styles.tagList]}>
        {unUsedTags.map((tag) => (
          <TagContainer title={tag} onAdd={add} />
        ))}
      </View>
      <Button title='Done' onPress={submit} />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  field: {},
  tagsWrapper: {
    flexDirection: 'row',
    marginTop: 30,
    flexWrap: 'wrap',
  },
  tagList: {
    borderTopWidth: 1,
    borderTopColor: '#D8D8D8',
    paddingTop: 20,
    flexWrap: 'wrap',
  },
});
