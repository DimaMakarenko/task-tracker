import React, { useMemo } from 'react';
import { Dimensions, View } from 'react-native';
// component
import { StackedBarChartData } from 'react-native-chart-kit';
import StackedBarChart from './StackedBarChart';
// utils
import { BAR_CHART_CONFIG, CHART_HEIGHT } from '../../utils/charts';

interface IBarChart {
  data: StackedBarChartData;
}

const BarChart: React.FC<IBarChart> = ({ data }) => {
  const screenWidth = useMemo(() => Dimensions.get('window').width, []);

  return (
    <View>
      <StackedBarChart
        // @ts-ignore
        data={data}
        width={screenWidth}
        height={CHART_HEIGHT}
        chartConfig={BAR_CHART_CONFIG}
        hideLegend={true}
        // @ts-ignore
        decimalPlaces={0}
        withVerticalLabels={true}
      />
    </View>
  );
};

export default BarChart;
