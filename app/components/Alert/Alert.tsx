import { Alert as RNAlert } from 'react-native';

export const alert = (title: string, description: string, actions: Function): void =>
  RNAlert.alert(title, description, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => actions(),
    },
  ]);
