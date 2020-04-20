import React from 'react';
import { View } from 'react-native';
// component
import Title from '../../../components/Title/Title';
// redux
import { useDispatch } from 'react-redux';
import { createTask } from '../../../store/reducers/tasks';
// form
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface ICreateTask {
  navigation: { navigate: Function };
}

const CreateTask: React.FC<ICreateTask> = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleClick = (value: any) => {
    dispatch(createTask(value));
    navigation.navigate('List');
  };
  return (
    <View style={basicStyles.container}>
      <Title text='Create task' />
      <TaskForm isCreate onSubmit={handleClick} />
    </View>
  );
};

export default CreateTask;
