import React from 'react';
import { View } from 'react-native';
// components
import Title from '../../../components/Title/Title';
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// redux
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../store/reducers/tasks';
// types
import { ITask } from '../../../types/store';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface IEditTask {
  route: {
    params: ITask;
  };
}

const EditTask: React.FC<IEditTask> = ({ route }) => {
  const { params } = route;
  const dispatch = useDispatch();
  const handleUpdate = (value: any) => {
    dispatch(updateTask({ id: params.id, task: value }));
  };
  return (
    <View style={basicStyles.container}>
      <Title text='Edit' />
      <TaskForm onSubmit={handleUpdate} task={params} />
    </View>
  );
};

export default EditTask;
