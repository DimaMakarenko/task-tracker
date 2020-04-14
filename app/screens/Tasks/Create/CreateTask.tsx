import React from 'react';
import { View } from 'react-native';
// component
import Title from '../../../components/Title/Title';
// redux
import { connect } from 'react-redux';
import { addTask } from '../../../store/reducers/tasks';
// form
import TaskForm from '../../../components/TaskForm/TaskForm';
// styles
import { basicStyles } from '../../../theme/basicStyles';
import { MyFormValues } from '../../../components/TaskForm/TaskForm';

interface ICreateTask {
  addTask: Function;
  navigation: { navigate: Function };
}
interface IHandleSubmit {
  values: MyFormValues;
}

const CreateTask: React.FC<ICreateTask> = ({ addTask, navigation }) => {
  const handleSubmit: IHandleSubmit = (values) => {
    addTask({
      id: Date.now(),
      title: values.title,
      project: values.project,
      duration: 0,
      isPaused: true,
      isDone: false,
    });
    navigation.navigate('List');
  };

  return (
    <View style={basicStyles.container}>
      <Title text='Create task' />
      <TaskForm isCreate formSubmit={handleSubmit} />
    </View>
  );
};

export default connect(null, { addTask })(CreateTask);
