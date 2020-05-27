import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
// component
import TextField from '../../Form/Text/TextField';
import Button from '../../Button/Button';
import TagList from '../../Tags/TagList';
import FilePicker from '../../FilePicker';
import ViewBox from '../../ViewBlock';
// form
import { Formik } from 'formik';
import { validationTaskForm } from '../../../utils/validation';
// types
import { ITask, ITag, TFile } from '../../../store/type';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// utils
import { durationFromMills, formatMills } from '../../../utils/time';
// routes
import { tasksRoutes } from '../../../navigation/routes';

interface ITaskForm {
  onSubmit: Function;
  task?: ITask;
  navigate: Function;
}

export interface MyFormValues {
  title: string;
  project: string;
  tags?: ITag;
  file: TFile | null;
}

const TaskForm: React.FC<ITaskForm> = ({ onSubmit, task, navigate }) => {
  const initialValues: MyFormValues = {
    title: task ? task.title : '',
    project: task ? task.project : '',
    tags: task ? task.tags : [],
    file: task ? task.file : null,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => onSubmit(values)} validationSchema={validationTaskForm}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={basicStyles.justify}>
          <View style={styles.block}>
            <TextField
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              label='Title'
              value={values.title}
              error={errors.title}
              touched={touched.title}
            />
            <TextField
              onChangeText={handleChange('project')}
              onBlur={handleBlur('project')}
              label='Project'
              value={values.project}
              error={errors.project}
              touched={touched.project}
            />
            {task && (
              <>
                <View style={[styles.timeBlock]}>
                  <ViewBox title='Start time' text={formatMills(task.startTimer)} />
                  <ViewBox title='End time' text={formatMills(task.startTimer + task.duration)} />
                </View>
                <ViewBox title='Duration' text={`${durationFromMills(task.duration)} h`} />
              </>
            )}
            <TouchableOpacity
              onPress={() => navigate(tasksRoutes.TAGS, { values: values.tags, setFieldValue, isEdit: !!task })}
            >
              <TextField label='Tags' disable value=' ' />
              {values.tags && <TagList tags={values.tags} />}
            </TouchableOpacity>
            <FilePicker value={values.file} setFieldValue={setFieldValue} />
          </View>
          <Button title={task ? 'Update task' : 'Start task'} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  block: { marginBottom: 30 },
  timeBlock: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default TaskForm;
