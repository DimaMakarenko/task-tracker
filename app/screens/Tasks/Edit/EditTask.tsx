import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useTaskAction } from '../../../hooks/useTaskAction';
// components
import Title from '../../../components/Title/Title';
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// types
import { ITask } from '../../../store/type';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface IEditTask {
  navigation: {
    navigate: Function;
  };
  route: {
    params: {
      task: ITask;
      deleteTask: Function;
      handleEdit: Function;
      handlePause: Function;
      handleStart: Function;
    };
  };
}

const EditTask: React.FC<IEditTask> = ({ navigation, route }) => {
  const { task, deleteTask, handleEdit, handlePause, handleStart } = route.params;
  const { editTask } = useTaskAction();

  const handleUpdate = useCallback(
    (value: any) => {
      editTask(task, value);
      navigation.navigate('Show', { taskId: task.id, deleteTask, handleEdit, handlePause, handleStart });
    },
    [task, deleteTask, handleEdit, handlePause, handleStart, navigation, editTask],
  );

  return (
    <View style={basicStyles.container}>
      <Title text='Edit4' />
      <TaskForm onSubmit={handleUpdate} task={task} />
    </View>
  );
};

export default EditTask;
