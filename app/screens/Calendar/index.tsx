import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
// hook
import { useCharts } from '../../hooks/useCharts';
// component
// @ts-ignore
import { WeekCalendar, CalendarProvider } from 'react-native-calendars';
import Title from '../../components/Title/Title';
import DayCalendar from '../../components/DayCalendar';
// styles
import { basicStyles } from '../../theme/basicStyles';
import { Colors } from '../../theme/colors';
// utils
import { dateToCalendar } from '../../utils/time';

interface ICalendar {}

const selectedStyle = {
  selected: true,
  marked: true,
  selectedColor: 'grey',
};

const Calendar: React.FC<ICalendar> = () => {
  const [selectedDate, setSelectDate] = useState({ date: new Date(), string: dateToCalendar(new Date()) });

  const { dateDayCalendar } = useCharts();

  const onDayPress = useCallback((date: string) => {
    setSelectDate({ date: new Date(date), string: date });
  }, []);

  const dayDate = useMemo(() => dateDayCalendar(selectedDate.date), [dateDayCalendar, selectedDate]);

  return (
    <>
      <View style={[basicStyles.container, basicStyles.bgScreen]}>
        <Title text='Calendars' />
      </View>
      <View>
        <CalendarProvider
          disabledOpacity={1}
          style={styles.weekCalendar}
          date={selectedDate.string}
          onDateChanged={onDayPress}
        >
          <WeekCalendar
            firstDay={1}
            allowShadow={false}
            height={30}
            markedDates={{ [selectedDate.string]: selectedStyle }}
          />
        </CalendarProvider>
      </View>
      <DayCalendar dataArray={dayDate} searchDay={selectedDate.date} />
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  weekCalendar: { backgroundColor: '#fff', borderBottomWidth: 1, flex: 0, borderColor: Colors.grey },
  dayCalendar: { backgroundColor: '#fff' },
});
