import { StyleSheet } from 'react-native';

const Colors = {
  grey: 'rgba(0, 0, 0, 0.4)',
  danger: 'rgba(218, 11, 11,0.6)',
  white: 'rgba(255, 255, 255, 1)',
};

export const basicStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenHeader: { marginBottom: 30 },
  container: {
    padding: 24,
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
    width: 28,
    height: 28,
    color: Colors.grey,
  },
  underline: {
    marginVertical: 22,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  chartWrapper: {
    marginBottom: 40,
  },
});
