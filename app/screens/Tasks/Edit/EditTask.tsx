import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useTasks } from '../../../hooks/useTasks';
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
  const { editTask, getTask } = useTasks();

  const currentTask = getTask(task.id);

  const handleUpdate = useCallback(
    (value: any) => {
      editTask(currentTask, value);
      navigation.navigate('Show', { taskId: task.id, deleteTask, handleEdit, handlePause, handleStart });
    },
    [currentTask, deleteTask, handleEdit, handlePause, handleStart, navigation, editTask],
  );

  return (
    <View style={[basicStyles.container, basicStyles.fullScreen]}>
      <Title text='Edit' />
      <TaskForm onSubmit={handleUpdate} task={currentTask} navigate={navigation.navigate} />
    </View>
  );
};

export default EditTask;
