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
      isEdit: boolean;
    };
  };
}

const Tags: React.FC<ITags> = ({ navigation, route }) => {
  const { values, setFieldValue, isEdit } = route.params;

  const submit = (tags: ITag) => {
    setFieldValue('tags', tags);
    navigation.navigate(isEdit ? tasksRoutes.EDIT : tasksRoutes.CREATE);
  };

  return (
    <View style={[basicStyles.container, basicStyles.fullScreen, basicStyles.bgScreen]}>
      <Title text='Add tags' style={[basicStyles.header, basicStyles.screenHeader]} />
      <TagContainer taskTags={values} btnText='Done' onSubmit={submit} isField />
    </View>
  );
};

export default Tags;
