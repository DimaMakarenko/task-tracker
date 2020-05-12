import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const basicStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenHeader: { marginBottom: 30 },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  bgScreen: {
    backgroundColor: Colors.white,
  },
  fullScreen: { height: '100%' },
  justify: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'column',
  },
  subTitle: { fontSize: 12, lineHeight: 18, color: Colors.grey },
  text: { fontSize: 14, lineHeight: 21 },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dangerText: { color: Colors.danger },
  icon: {
    fontSize: 24,
  },
  grayColor: { color: Colors.grey },
  underline: {
    marginVertical: 22,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  chartWrapper: {
    marginBottom: 40,
  },
});
