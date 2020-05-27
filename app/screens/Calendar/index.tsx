import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
// hook
import { useCharts } from '../../hooks/useCharts';
import { useNavigation } from '@react-navigation/native';
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
import { tasksRoutes } from '../../navigation/routes';
// types
import { TAppt } from '../../components/DayCalendar/type';

interface ICalendar {
  navigation: { navigate: Function };
}

const selectedStyle = {
  selected: true,
  marked: true,
  selectedColor: 'grey',
};

const Calendar: React.FC<ICalendar> = ({}) => {
  const [selectedDate, setSelectDate] = useState({ date: new Date(), string: dateToCalendar(new Date()) });
  const navigation = useNavigation();
  const { dateDayCalendar } = useCharts();

  const onDayPress = useCallback((date: string) => {
    setSelectDate({ date: new Date(date), string: date });
  }, []);

  const dayDate = useMemo(() => dateDayCalendar(selectedDate.date), [dateDayCalendar, selectedDate]);

  const editTask = useCallback(
    (appt: TAppt) => {
      navigation.navigate(tasksRoutes.EDIT, { taskId: appt.id });
    },
    [navigation],
  );

  return (
    <>
      <View style={[basicStyles.container, basicStyles.bgScreen]}>
        <Title text='Calendars' />
      </View>
      <View>
        <CalendarProvider disabledOpacity={1} date='2020-05-03' style={styles.weekCalendar} onDateChanged={onDayPress}>
          <WeekCalendar
            allowShadow={false}
            height={30}
            markedDates={{ [selectedDate.string]: selectedStyle }}
            firstDay={1}
          />
        </CalendarProvider>
      </View>
      <DayCalendar dataArray={dayDate} searchDay={selectedDate.date} onClick={editTask} />
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  weekCalendar: { backgroundColor: '#fff', borderBottomWidth: 1, flex: 0, borderColor: Colors.grey },
  dayCalendar: { backgroundColor: '#fff' },
});
