import React from 'react';
import { View } from 'react-native';
// component
import TextField from '../Form/Text/TextField';
import Button from '../Button/Button';
// form
import { Formik } from 'formik';
import { validationTaskForm } from '../../utils/validation';

interface ITaskForm {
  isCreate: boolean;
  formSubmit: Function;
}

export interface MyFormValues {
  title: string;
  project: string;
}

const TaskForm: React.FC<ITaskForm> = ({ isCreate, formSubmit }) => {
  const initialValues: MyFormValues = {
    title: '',
    project: '',
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => formSubmit(values)}
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
            <Button title={isCreate ? 'Start task' : 'Update task'} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default TaskForm;
