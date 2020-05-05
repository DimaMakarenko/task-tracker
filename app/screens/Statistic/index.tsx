import React from 'react';
import { View } from 'react-native';
import { useCharts } from '../../hooks/useCharts';
// component
import Title from '../../components/Title/Title';
import Loader from '../../components/Loader/Loader';
import LineChart from '../../components/LineChart';
// styles
import { basicStyles } from '../../theme/basicStyles';

const Statistic = () => {
  const { isLoading, dateChartHours, dateChartTasks } = useCharts();

  return (
    <View style={basicStyles.container}>
      <View style={basicStyles.header}>
        <Title text='Statistic' />
      </View>
      <View>
        <Loader isLoading={isLoading}>
          <LineChart data={dateChartTasks} />
          <LineChart data={dateChartHours} yAxisSuffix='h' />
        </Loader>
      </View>
    </View>
  );
};

export default Statistic;
