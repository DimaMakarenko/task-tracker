import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useTasks } from '../../../hooks/useTasks';
// components
import Title from '../../../components/Title/Title';
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// types
import { ITask } from '../../../store/type';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// routes
import { tasksRoutes } from '../../../navigation/routes';

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
      navigation.navigate(tasksRoutes.SHOW, { taskId: task.id, deleteTask, handleEdit, handlePause, handleStart });
    },
    [currentTask, deleteTask, handleEdit, handlePause, handleStart, navigation, editTask],
  );

  return (
    <ScrollView>
      <View style={[basicStyles.container, basicStyles.fullScreen, basicStyles.bgScreen]}>
        <Title text='Edit' style={[basicStyles.header, basicStyles.screenHeader]} />
        <TaskForm onSubmit={handleUpdate} task={currentTask} navigate={navigation.navigate} />
      </View>
    </ScrollView>
  );
};

export default EditTask;
