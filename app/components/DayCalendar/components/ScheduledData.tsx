import React from 'react';
import { View } from 'react-native';
// components
// @ts-ignore
import { AppContext } from 'rnschedule/src/components/ContextProvider';
// @ts-ignore
import todayData from 'rnschedule/src/services/todayData';
import RowView from './RowView';
// types
import { TCalendarData } from '../type';

interface IScheduledData {
  dataArray: TCalendarData[];
  onEventPress: () => void;
}

const ScheduledData: React.FC<IScheduledData> = ({ dataArray, onEventPress }) => (
  <AppContext.Consumer>
    {(context: { date: Date; hour_size: number }) => {
      const data = todayData(dataArray, context.date);
      return (
        <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
          {data.map((row: string, i: number) => (
            <RowView key={i} row={row} hour_size={context.hour_size} onEventPress={onEventPress} />
          ))}
        </View>
      );
    }}
  </AppContext.Consumer>
);

export default ScheduledData;
