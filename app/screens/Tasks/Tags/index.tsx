import React from 'react';
import { View } from 'react-native';
// component
import Title from '../../../components/Title/Title';
import TagContainer from '../../../components/Tags/TagContainer';
// style
import { basicStyles } from '../../../theme/basicStyles';
// types
import { ITag } from '../../../store/type';
// routes
import { tasksRoutes } from '../../../navigation/routes';

interface ITags {
  navigation: {
    navigate: Function;
  };
  route: {
    params: {
      values: ITag;
      setFieldValue: Function;
    };
  };
}

const Tags: React.FC<ITags> = ({ navigation, route }) => {
  const { values, setFieldValue } = route.params;

  const submit = (tags: ITag) => {
    setFieldValue('tags', tags);
    navigation.navigate(tasksRoutes.EDIT);
  };

  return (
    <View style={[basicStyles.container, basicStyles.fullScreen]}>
      <Title text='Add tags' />
      <TagContainer taskTags={values} btnText='Done' onSubmit={submit} isField />
    </View>
  );
};

export default Tags;
