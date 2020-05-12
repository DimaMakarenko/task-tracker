import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// component
import Title from '../../../components/Title/Title';
import TagContainer from '../../../components/Tags/TagContainer';
// styles
import { basicStyles } from '../../../theme/basicStyles';
import { Icon } from 'native-base';
// types
import { ITag } from '../../../store/type';
// routes
import { tasksRoutes } from '../../../navigation/routes';

interface IFilters {
  navigation: {
    navigate: Function;
  };
  route: {
    params: {
      setFilter: Function;
      filteredTags: ITag;
    };
  };
}

const Filters: React.FC<IFilters> = ({ navigation, route }) => {
  const { setFilter, filteredTags } = route.params;

  const applyFilter = (value: ITag) => {
    setFilter(value);
    navigation.navigate(tasksRoutes.LIST);
  };

  return (
    <View style={[basicStyles.container, basicStyles.fullScreen, basicStyles.bgScreen]}>
      <View style={[basicStyles.header, basicStyles.screenHeader]}>
        <View style={basicStyles.flexRow}>
          <Title text='Filter' />
          <View>
            <Icon type='MaterialCommunityIcons' name='filter-variant' style={styles.filterIcon} />
          </View>
        </View>
        <Text onPress={() => {}} style={basicStyles.dangerText}>
          Clear Filters
        </Text>
      </View>
      <TagContainer taskTags={filteredTags} onSubmit={applyFilter} btnText='Apply filters' />
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filterIcon: {
    fontSize: 20,
    marginLeft: 10,
    color: '#DA0B0B',
  },
});
