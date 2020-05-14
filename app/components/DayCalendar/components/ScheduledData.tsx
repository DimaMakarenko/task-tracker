import React from 'react';
import { View } from 'react-native';
// components
// @ts-ignore
import todayData from 'rnschedule/src/services/todayData';
import RowView from './RowView';
// types
import { TCalendarData } from '../type';

interface IScheduledData {
  dataArray: TCalendarData[];
  searchDay: Date;
  hour_size: number;
  onClick: Function;
}

const ScheduledData: React.FC<IScheduledData> = ({ dataArray, searchDay, onClick, hour_size }) => {
  const data = todayData(dataArray, searchDay);
  return (
    <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
      {data.map((row: string, i: number) => (
        <RowView key={i} row={row} hour_size={hour_size} onEventPress={onClick} />
      ))}
    </View>
  );
};

export default ScheduledData;
