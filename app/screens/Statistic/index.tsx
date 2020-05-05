import React from 'react';
import { View } from 'react-native';
import { useCharts } from '../../hooks/useCharts';
// component
import Title from '../../components/Title/Title';
import Loader from '../../components/Loader/Loader';
import LineChart from '../../components/LineChart';
// styles
import { basicStyles } from '../../theme/basicStyles';

import { LineChartData } from 'react-native-chart-kit';

const Statistic = () => {
  const { isLoading, dateChartHours, dateChartTasks } = useCharts();

  const data: LineChartData = {
    labels: ['2', '4', '6', '8', '10', '12'],
    datasets: [
      {
        data: [20, 45, 28, 80, 80, 43, 64, 53],
      },
    ],
  };
  console.log('dateChartTasks', dateChartTasks);
  return (
    <View style={basicStyles.container}>
      <View style={basicStyles.header}>
        <Title text='Statistic' />
      </View>
      <View>
        <Loader isLoading={isLoading}>
          <LineChart data={dateChartTasks} />
        </Loader>
      </View>
    </View>
  );
};

export default Statistic;
