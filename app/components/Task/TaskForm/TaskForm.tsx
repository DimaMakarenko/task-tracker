import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// component
import TextField from '../../Form/Text/TextField';
import Button from '../../Button/Button';
// form
import { Formik } from 'formik';
import { validationTaskForm } from '../../../utils/validation';
// types
import { ITask } from '../../../store/type';
import { basicStyles } from '../../../theme/basicStyles';
import { dateFromMillis, formatMills } from '../../../utils/time';

interface ITaskForm {
  onSubmit: Function;
  task?: ITask;
}

export interface MyFormValues {
  title: string;
  project: string;
}

const TaskForm: React.FC<ITaskForm> = ({ onSubmit, task }) => {
  const initialValues: MyFormValues = {
    title: task ? task.title : '',
    project: task ? task.project : '',
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validationTaskForm}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextField
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              placeholder='Title'
              value={values.title}
              error={errors.title}
              touched={touched.title}
            />
            <TextField
              onChangeText={handleChange('project')}
              onBlur={handleBlur('project')}
              placeholder='Project'
              value={values.project}
              error={errors.project}
              touched={touched.project}
            />
            {task && (
              <>
                <View style={[styles.block, styles.timeBlock]}>
                  <View>
                    <Text style={basicStyles.subTitle}>Start time</Text>
                    <Text style={basicStyles.text}>{formatMills(task.startTimer)}</Text>
                  </View>
                  <View>
                    <Text style={basicStyles.subTitle}>End time</Text>
                    <Text style={basicStyles.text}>{formatMills(task.startTimer + task.duration)}</Text>
                  </View>
                </View>
                <View style={styles.block}>
                  <Text style={basicStyles.subTitle}>Duration</Text>
                  <Text style={basicStyles.text}>{dateFromMillis(task.duration)} h</Text>
                </View>
              </>
            )}
            <Button title={task ? 'Update task' : 'Start task'} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  block: { marginBottom: 30 },
  timeBlock: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default TaskForm;
