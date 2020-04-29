import Toast from 'react-native-simple-toast';

export const stopActiveTask = () => Toast.show('You need stop the active task!', Toast.LONG);

export const customToast = (text: string) => Toast.show(text, Toast.LONG);
