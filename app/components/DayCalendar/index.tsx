import React from 'react';
import { View } from 'react-native';
// @ts-ignore
import { ContextProvider } from 'rnschedule/src/components/ContextProvider';
// @ts-ignore
import SmartScroll from 'rnschedule/src/components/SmartScroll';
// @ts-ignore
import TimeCol from 'rnschedule/src/components/TimeCol';
// @ts-ignore
import DrawnGrid from 'rnschedule/src/components/DrawnGrid';
// @ts-ignore
import styles from 'rnschedule/src/components/styles';
// @ts-ignore
import procData from 'rnschedule/src/services/procData';
// component
import ScheduledData from './components/ScheduledData';
// types
import { TCalendarData } from './type';
// styles
import { Colors } from '../../theme/colors';

interface IDayCalendar {
  dataArray: TCalendarData[];
  searchDay: Date;
  isDrawGrid?: boolean;
}

const hourSize = 50;

const DayCalendar: React.FC<IDayCalendar> = ({ dataArray, searchDay, isDrawGrid }) => {
  let data = !!dataArray && procData(dataArray, hourSize);

  return (
    <ContextProvider hour_size={hourSize}>
      <SmartScroll hour_size={hourSize}>
        <View
          style={[styles.body, { backgroundColor: Colors.white, paddingRight: 10, paddingBottom: 20, paddingTop: 10 }]}
        >
          <View style={styles.hour_col}>
            <TimeCol hour_size={hourSize} />
          </View>
          <View style={styles.schedule_col}>
            {isDrawGrid && <DrawnGrid />}
            {!!data && (
              <ScheduledData
                dataArray={data}
                onEventPress={() => console.log('press')}
                searchDay={searchDay}
                hour_size={hourSize}
              />
            )}
          </View>
        </View>
      </SmartScroll>
    </ContextProvider>
  );
};

export default DayCalendar;
