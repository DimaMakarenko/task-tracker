import React from 'react';
import { View } from 'react-native';
// component
// import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import Title from '../../components/Title/Title';

interface ICalendar {}

const Calendar: React.FC<ICalendar> = () => {
  return (
    <View>
      <Title text='Calendars' />
    </View>
  );
};

export default Calendar;
