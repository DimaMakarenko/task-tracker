import React, { useCallback, useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
// redux
import { useSelector } from 'react-redux';
import { selectTags } from '../../store/reducers/tags/selectors';
// component
import Button from '../Button/Button';
import TextField from '../Form/Text/TextField';
import TagList from './TagList';
// styles
import { basicStyles } from '../../theme/basicStyles';
// type
import { ITag } from '../../store/type';

interface ITagContainer {
  taskTags: ITag;
  onSubmit: (arg0: ITag) => void;
  btnText: string;
  isField?: boolean;
}

const TagContainer: React.FC<ITagContainer> = ({ taskTags, onSubmit, btnText, isField }) => {
  const [tags, setTags] = useState(taskTags ? taskTags : []);
  const [fieldTag, setFieldTag] = useState('');
  const tagsList = useSelector(selectTags);

  const unSelectTags = useMemo(() => tagsList.filter((tag) => (tags.length > 0 ? !tags.includes(tag) : tagsList)), [
    tagsList,
    tags,
  ]);

  const add = useCallback((tagName: string) => {
    setTags((prev) => [...prev, tagName]);
  }, []);

  const remove = useCallback((tagName: string) => {
    setTags((prev) => prev.filter((tag) => tagName !== tag));
  }, []);

  const submit = useCallback(() => {
    onSubmit(tags);
  }, [tags, onSubmit]);

  const create = useCallback(() => {
    setTags((prev) => (prev.includes(fieldTag) ? prev : [...prev, fieldTag]));
    setFieldTag('');
  }, [fieldTag]);

  return (
    <View style={basicStyles.justify}>
      <ScrollView>
        {isField && (
          <TextField label='Tag' value={fieldTag} onChangeText={setFieldTag} iconName='tag-plus' submit={create} />
        )}
        <TagList tags={tags} remove={remove} />
        <View style={basicStyles.underline} />
        <TagList tags={unSelectTags} add={add} />
      </ScrollView>
      <Button onPress={submit} title={btnText} />
    </View>
  );
};

export default TagContainer;
