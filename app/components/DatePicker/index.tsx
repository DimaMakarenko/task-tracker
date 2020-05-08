import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
// component
import DateTimePicker from '@react-native-community/datetimepicker';
import TextField from '../Form/Text/TextField';
// utils
import { dateToPicker } from '../../utils/time';
// styles
import { basicStyles } from '../../theme/basicStyles';

interface IDatePicker {
  data: Date;
  setData: (arg0: Date) => void;
}

const DatePicker: React.FC<IDatePicker> = ({ setData, data }) => {
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: React.FormEvent<HTMLInputElement>, selectedDate?: Date): void => {
    const currentDate = selectedDate || data;
    setShow(false);
    setData(currentDate);
  };

  return (
    <View style={basicStyles.container}>
      {show && <DateTimePicker value={data} onChange={onChange} mode={'date'} />}
      <TouchableOpacity onPress={() => setShow(true)} activeOpacity={0.7}>
        <TextField value={dateToPicker(data)} disable iconName='calendar-text-outline' />
      </TouchableOpacity>
    </View>
  );
};

export default DatePicker;
