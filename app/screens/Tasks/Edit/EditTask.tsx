import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
// hooks
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
      taskId: number;
    };
  };
}

const EditTask: React.FC<IEditTask> = ({ navigation, route }) => {
  const { taskId } = route.params;

  const { editTask, getTask } = useTasks();

  const currentTask = getTask(taskId);

  const handleUpdate = useCallback(
    (value: any) => {
      editTask(currentTask, value).then((response) => navigation.navigate(tasksRoutes.SHOW, { task: response.task }));
    },
    [taskId, currentTask, editTask, navigation],
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
