import React, { useCallback } from 'react';
import { View } from 'react-native';
// components
import Title from '../../../components/Title/Title';
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// types
import { ITask } from '../../../store/type';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface IEditTask {
  route: {
    params: ITask;
  };
}

const EditTask: React.FC<IEditTask> = ({ route }) => {
  const { params } = route;

  const handleUpdate = useCallback((value: any) => {
    console.log('updete task', value);
  }, []);

  return (
    <View style={basicStyles.container}>
      <Title text='Edit' />
      <TaskForm onSubmit={handleUpdate} task={params} />
    </View>
  );
};

export default EditTask;
