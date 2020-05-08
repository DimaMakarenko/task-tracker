import React, { useMemo, useState, useCallback } from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
// component
import { LineChart as LineChartKit, LineChartData } from 'react-native-chart-kit';
import DateSelector from './DateSelector';
// const
import { LINE_CHART_CONFIG, CHART_HEIGHT } from './configs';
// types
import { TWeek } from './type';
// styles
import { basicStyles } from '../../theme/basicStyles';

interface ILineChart {
  dataCallback: (arg0: TWeek) => LineChartData;
  yAxisSuffix?: string;
  dataIntervals: TWeek[];
  title?: string;
}
const screenWidth = Dimensions.get('window').width - 35;

const LineChart: React.FC<ILineChart> = ({ dataCallback, yAxisSuffix, dataIntervals, title }) => {
  const [activeWeek, setActiveWeek] = useState(dataIntervals.length - 1);

  const data = useMemo(() => dataCallback(dataIntervals[activeWeek]), [dataCallback, activeWeek, dataIntervals]);
  const formatYLabel = useCallback((label) => Math.round(Number(label)).toString(), []);

  const next = useCallback(() => setActiveWeek(activeWeek === dataIntervals.length - 1 ? activeWeek : activeWeek + 1), [
    activeWeek,
    dataIntervals,
  ]);

  const prev = useCallback(() => setActiveWeek(activeWeek === 0 ? activeWeek : activeWeek - 1), [activeWeek]);

  return (
    <View style={basicStyles.chartWrapper}>
      <View style={[basicStyles.header, styles.title]}>
        <DateSelector next={next} prev={prev} date={dataIntervals[activeWeek]} />
        <Text style={basicStyles.subTitle}>{title}</Text>
      </View>
      <LineChartKit
        data={data}
        width={screenWidth}
        height={CHART_HEIGHT}
        chartConfig={LINE_CHART_CONFIG}
        withInnerLines={false}
        segments={3}
        formatYLabel={formatYLabel}
        yAxisSuffix={yAxisSuffix && yAxisSuffix}
        style={{
          paddingRight: 34,
        }}
      />
    </View>
  );
};

export default LineChart;

const styles = StyleSheet.create({
  title: { paddingHorizontal: 24 },
});
