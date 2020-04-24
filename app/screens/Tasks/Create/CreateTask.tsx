import React from 'react';
import { View } from 'react-native';
import { useTaskAction } from '../../../hooks/useTaskAction';
// component
import Title from '../../../components/Title/Title';
// redux
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/reducers/user/selectors';
// form
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// styles
import { basicStyles } from '../../../theme/basicStyles';
import { RootState } from '../../../store/rootReducer';

interface ICreateTask {
  navigation: { navigate: Function };
}

const CreateTask: React.FC<ICreateTask> = ({ navigation }) => {
  const { uid } = useSelector((state: RootState) => getUser(state));
  const { createTask } = useTaskAction();

  const handleClick = (value: any) => {
    createTask({ uid, task: value });
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
