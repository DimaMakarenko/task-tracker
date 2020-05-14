import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// hook
import { useCharts } from '../../hooks/useCharts';
// component
// @ts-ignore
import { WeekCalendar, CalendarProvider } from 'react-native-calendars';
import Title from '../../components/Title/Title';
import DayCalendar from '../../components/DayCalendar';
// styles
import { basicStyles } from '../../theme/basicStyles';

interface ICalendar {}

const Calendar: React.FC<ICalendar> = () => {
  const [selectDate, setSelectDate] = useState(new Date());

  const newDay = new Date(2020, 4, 9);
  const { dateDayCalendar } = useCharts();

  const aa = dateDayCalendar(newDay);
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
      <DayCalendar dataArray={aa} searchDay={newDay} />
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  weekCalendar: { backgroundColor: '#fff', borderBottomWidth: 1, flex: 0 },
});
