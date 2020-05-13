import React from 'react';
import { View } from 'react-native';
// @ts-ignore
import ApptView from './ApptView';
// type
import { TAppt } from '../type';

interface IRowView {
  row: any;
  hour_size: number;
  onEventPress: () => void;
}

const RowView: React.FC<IRowView> = ({ row, hour_size, onEventPress }) => {
  return (
    <View
      style={{
        width: '100%',
        position: 'absolute',
        marginTop: row.hrsBefore * hour_size,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      {row.rowAppts.map((appt: TAppt, i: number) => (
        <ApptView key={i} topTime={row.start} appt={appt} hour_size={hour_size} onEventPress={onEventPress} />
      ))}
    </View>
  );
};

export default RowView;
