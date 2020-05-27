import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useCharts } from '../../hooks/useCharts';
// component
import Title from '../../components/Title/Title';
import Loader from '../../components/Loader/Loader';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
// styles
import { basicStyles } from '../../theme/basicStyles';

const Statistic = () => {
  const { isLoading, dateChartHours, dateChartTasks, dateChartPerDay, activeWeeks } = useCharts();

  return (
    <View style={[basicStyles.bgScreen, basicStyles.fullScreen]}>
      <Loader isLoading={isLoading}>
        <View style={[basicStyles.container]}>
          <Title text='Statistic' style={[basicStyles.header]} />
        </View>

        {activeWeeks ? (
          <ScrollView>
            <LineChart dataCallback={dateChartHours} yAxisSuffix='h' dataIntervals={activeWeeks} title='Logged time' />
            <LineChart dataCallback={dateChartTasks} dataIntervals={activeWeeks} title='Logged tasks' />
            <BarChart dataCallback={dateChartPerDay} title='Logged per day' />
          </ScrollView>
        ) : (
          <View style={basicStyles.emptyList}>
            <Text style={basicStyles.emptyListText}> List is empty</Text>
          </View>
        )}
      </Loader>
    </View>
  );
};

export default Statistic;
