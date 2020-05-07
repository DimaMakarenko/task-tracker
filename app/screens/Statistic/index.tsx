import React from 'react';
import { View, ScrollView } from 'react-native';
import { useCharts } from '../../hooks/useCharts';
// component
import Title from '../../components/Title/Title';
import Loader from '../../components/Loader/Loader';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
// styles
import { basicStyles } from '../../theme/basicStyles';

const Statistic = () => {
  const { isLoading, dateChartHours, dateChartTasks, dateChartPerDay } = useCharts();

  return (
    <ScrollView>
      <View style={basicStyles.container}>
        <View style={basicStyles.header}>
          <Title text='Statistic' />
        </View>
        <View>
          <Loader isLoading={isLoading}>
            <LineChart data={dateChartTasks} />
            <LineChart data={dateChartHours} yAxisSuffix='h' />
            <BarChart dataCallback={dateChartPerDay} />
          </Loader>
        </View>
      </View>
    </ScrollView>
  );
};

export default Statistic;
