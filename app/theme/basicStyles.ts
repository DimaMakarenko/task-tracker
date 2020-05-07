import { StyleSheet } from 'react-native';

export const basicStyles = StyleSheet.create({
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  fullScreen: { height: '100%' },
  justify: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'column',
  },
  subTitle: { fontSize: 12, lineHeight: 18, color: 'rgba(0, 0, 0, 0.4)' },
  text: { fontSize: 14, lineHeight: 21 },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dangerText: { color: 'rgba(218, 11, 11,0.6)' },
  icon: {
    width: 28,
    height: 28,
    color: 'rgba(0, 0, 0, 0.4)',
  },
});
