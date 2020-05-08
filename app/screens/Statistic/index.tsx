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
    <View style={basicStyles.bgScreen}>
      {activeWeeks ? (
        <ScrollView>
          <View style={basicStyles.container}>
            <Title text='Statistic' style={[basicStyles.header]} />
          </View>
          <View>
            <Loader isLoading={isLoading}>
              <LineChart
                dataCallback={dateChartHours}
                yAxisSuffix='h'
                dataIntervals={activeWeeks}
                title='Logged time'
              />
              <LineChart dataCallback={dateChartTasks} dataIntervals={activeWeeks} title='Logged tasks' />
              <BarChart dataCallback={dateChartPerDay} title='Logged per day' />
            </Loader>
          </View>
        </ScrollView>
      ) : (
        <View>
          <Text> List is empty</Text>
        </View>
      )}
    </View>
  );
};

export default Statistic;
