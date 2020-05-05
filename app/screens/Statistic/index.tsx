import React from 'react';
import { View, StyleSheet } from 'react-native';
// component
import Title from '../../components/Title/Title';
import LineChart from './LineChart';
// styles
import { basicStyles } from '../../theme/basicStyles';
// types
import { LineChartData } from 'react-native-chart-kit';

const Tasks = () => {
  const data: LineChartData = {
    labels: ['2', '4', '6', '8', '10', '12'],
    datasets: [
      {
        data: [20, 45, 28, 80, 80, 43, 64, 53],
      },
    ],
  };
  return (
    <View style={basicStyles.container}>
      <View style={styles.header}>
        <Title text='Statistic' />
      </View>
      <View>
        <LineChart data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logOut: { color: 'rgba(218, 11, 11,0.6)' },
  text: {
    fontSize: 26,
  },
});

export default Tasks;
