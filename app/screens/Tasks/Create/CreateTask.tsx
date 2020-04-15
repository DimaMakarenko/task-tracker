import React from 'react';
import { View } from 'react-native';
// component
import Title from '../../../components/Title/Title';
// redux
import { connect } from 'react-redux';
import { addTask } from '../../../store/reducers/tasks';
import { addActiveTaskId } from '../../../store/reducers/activeTask';
// form
import TaskForm from '../../../components/Task/TaskForm/TaskForm';
// styles
import { basicStyles } from '../../../theme/basicStyles';

interface ICreateTask {
  navigation: { navigate: Function };
}

const CreateTask: React.FC<ICreateTask> = ({ navigation }) => {
  return (
    <View style={basicStyles.container}>
      <Title text='Create task' />
      <TaskForm isCreate onSubmit={() => console.log('create')} />
    </View>
  );
};

export default connect(null, { addTask, addActiveTaskId })(CreateTask);
