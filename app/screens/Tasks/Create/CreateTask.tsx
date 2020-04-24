import React from 'react';
import { View } from 'react-native';
// component
import Title from '../../../components/Title/Title';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../store/reducers/tasks/actions';
import { getUser } from '../../../store/reducers/user/selectors';
// form
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// styles
import { basicStyles } from '../../../theme/basicStyles';
import { RootState } from '../../../store/rootReducer';
import { getNewTask } from '../../../utils/taskGenerate';

interface ICreateTask {
  navigation: { navigate: Function };
}

const CreateTask: React.FC<ICreateTask> = ({ navigation }) => {
  const { uid } = useSelector((state: RootState) => getUser(state));
  const dispatch = useDispatch();

  const handleClick = (value: any) => {
    dispatch(addTask({ uid, task: value }));
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
