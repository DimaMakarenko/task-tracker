import React from 'react';
import { View } from 'react-native';
// component
import Title from '../../../components/Title/Title';
// form
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface ICreateTask {
  navigation: { navigate: Function };
}

const CreateTask: React.FC<ICreateTask> = ({ navigation }) => {
  const handleClick = (value: any) => {
    console.log('create', value);
    navigation.navigate('List');
  };
  return (
    <View style={basicStyles.container}>
      <Title text='Create task' />
      <TaskForm onSubmit={handleClick} />
    </View>
  );
};

export default CreateTask;
