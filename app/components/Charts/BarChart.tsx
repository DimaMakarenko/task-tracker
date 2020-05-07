import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
// component
import { StackedBarChartData } from 'react-native-chart-kit';
import StackedBarChart from './StackedBarChart';
import DatePicker from '../DatePicker';
// utils
import { BAR_CHART_CONFIG, CHART_HEIGHT } from './configs';

interface IBarChart {
  dataCallback: (searchData: Date) => StackedBarChartData;
}

const BarChart: React.FC<IBarChart> = ({ dataCallback }) => {
  const screenWidth = useMemo(() => Dimensions.get('window').width, []);
  const [searchData, setSearchData] = useState(new Date(2020, 4, 3));
  const formatYLabel = useCallback((label) => Math.round(Number(label)).toString(), []);

  const data = useMemo(() => dataCallback(searchData), [dataCallback, searchData]);

  return (
    <View>
      <StackedBarChart
        // @ts-ignore
        data={data}
        width={screenWidth}
        height={CHART_HEIGHT}
        chartConfig={BAR_CHART_CONFIG}
        hideLegend={true}
        formatYLabel={formatYLabel}
        // @ts-ignore
        decimalPlaces={0}
        withVerticalLabels={true}
      />
      <DatePicker setData={setSearchData} data={searchData} />
    </View>
  );
};

export default BarChart;
