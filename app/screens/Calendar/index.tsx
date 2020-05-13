import React from 'react';
import { View, StyleSheet } from 'react-native';
// component
// @ts-ignore
import { WeekCalendar, CalendarProvider } from 'react-native-calendars';
import Title from '../../components/Title/Title';
import DayCalendar from '../../components/DayCalendar';
// styles
import { basicStyles } from '../../theme/basicStyles';

interface ICalendar {}

const Calendar: React.FC<ICalendar> = () => {
  const a = [
    {
      title: 'Lunch Appointment',
      duration: 1123,
      start: new Date(2020, 4, 13, 13, 20),
      end: new Date(2020, 4, 13, 14, 20),
      id: 121515,
      color: '#E9E5E5',
    },
    {
      title: 'Lunch Appointment',
      duration: 161616,
      start: new Date(2020, 4, 13, 15, 20),
      end: new Date(2020, 4, 13, 18, 20),
      id: 1215157,
      color: '#E9E5E5',
    },
  ];
  return (
    <>
      <View style={[basicStyles.container, basicStyles.bgScreen]}>
        <Title text='Calendars' />
      </View>
      <View>
        <CalendarProvider disabledOpacity={0.6} style={styles.weekCalendar}>
          <WeekCalendar firstDay={1} allowShadow={false} height={30} />
        </CalendarProvider>
      </View>
      <DayCalendar dataArray={a} />
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  weekCalendar: { backgroundColor: '#fff', borderBottomWidth: 1, flex: 0 },
});
