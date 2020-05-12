import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useTasks } from '../../../hooks/useTasks';
// component
import Title from '../../../components/Title/Title';
// redux
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/reducers/user/selectors';
// form
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// routes
import { tasksRoutes } from '../../../navigation/routes';

interface ICreateTask {
  navigation: { navigate: Function };
}

const CreateTask: React.FC<ICreateTask> = ({ navigation }) => {
  const { uid } = useSelector(selectUser);
  const { createTask } = useTasks();

  const handleClick = useCallback(
    (value: any) => {
      createTask({ uid, task: value });
      navigation.navigate(tasksRoutes.LIST);
    },
    [navigation, uid],
  );

  return (
    <ScrollView>
      <View style={[basicStyles.container, basicStyles.fullScreen, basicStyles.bgScreen]}>
        <Title text='Create task' style={[basicStyles.header, basicStyles.screenHeader]} />
        <TaskForm onSubmit={handleClick} navigate={navigation.navigate} />
      </View>
    </ScrollView>
  );
};

export default CreateTask;
