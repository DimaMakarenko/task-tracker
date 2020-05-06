import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
// component
import { LineChart as LineChartKit, LineChartData } from 'react-native-chart-kit';
// const
import { LINE_CHART_CONFIG, CHART_HEIGHT } from '../../utils/charts';
// types

interface ILineChart {
  data: LineChartData;
  yAxisSuffix?: string;
}

const LineChart: React.FC<ILineChart> = ({ data, yAxisSuffix }) => {
  const screenWidth = useMemo(() => Dimensions.get('window').width, []);

  return (
    <LineChartKit
      data={data}
      width={screenWidth}
      height={CHART_HEIGHT}
      chartConfig={LINE_CHART_CONFIG}
      withInnerLines={false}
      segments={3}
      yAxisSuffix={yAxisSuffix && yAxisSuffix}
    />
  );
};

export default LineChart;
