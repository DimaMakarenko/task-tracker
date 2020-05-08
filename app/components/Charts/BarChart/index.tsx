import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
// component
import { StackedBarChartData } from 'react-native-chart-kit';
import StackedBarChart from '../StackedBarChart';
import DatePicker from '../../DatePicker';
// utils
import { BAR_CHART_CONFIG, CHART_HEIGHT } from '../configs';
import { basicStyles } from '../../../theme/basicStyles';

interface IBarChart {
  dataCallback: (searchData: Date) => StackedBarChartData | [];
  title?: string;
}
const screenWidth = Dimensions.get('window').width;

const BarChart: React.FC<IBarChart> = ({ dataCallback, title }) => {
  const [searchData, setSearchData] = useState(new Date());
  const formatYLabel = useCallback((label) => Math.round(Number(label)).toString(), []);

  const data = useMemo(() => dataCallback(searchData), [dataCallback, searchData]);

  return (
    <View>
      <Text style={[basicStyles.subTitle, styles.title]}>{title}</Text>
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
        yAxisSuffix='h'
        style={{
          paddingLeft: 5,
        }}
      />
      <DatePicker setData={setSearchData} data={searchData} />
    </View>
  );
};

export default BarChart;

const styles = StyleSheet.create({
  title: { flexDirection: 'row', textAlign: 'right', paddingHorizontal: 24 },
});
