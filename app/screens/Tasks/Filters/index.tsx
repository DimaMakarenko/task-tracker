import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTags } from '../../../hooks/useTags';
// component
import Title from '../../../components/Title/Title';

interface IFilters {}

const Filters: React.FC<IFilters> = () => {
  const { filterTags } = useTags();

  filterTags();

  return (
    <View>
      <Title text='Filters' />
    </View>
  );
};

export default Filters;
