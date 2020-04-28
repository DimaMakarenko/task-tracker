import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useTaskAction } from '../../../hooks/useTaskAction';
// component
import Title from '../../../components/Title/Title';
// redux
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/reducers/user/selectors';
// form
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface ICreateTask {
  navigation: { navigate: Function };
}

const CreateTask: React.FC<ICreateTask> = ({ navigation }) => {
  const { uid } = useSelector(selectUser);
  const { createTask } = useTaskAction();

  const handleClick = useCallback(
    (value: any) => {
      createTask({ uid, task: value });
      navigation.navigate('List');
    },
    [uid],
  );

  return (
    <View style={basicStyles.container}>
      <Title text='Create task' />
      <TaskForm onSubmit={handleClick} navigate={navigation.navigate} />
    </View>
  );
};

export default CreateTask;
