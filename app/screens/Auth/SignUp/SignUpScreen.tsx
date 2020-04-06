import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// components
import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';
import EmailField from '../../../components/Form/Email/Email';
import PasswordField from '../../../components/Form/Password/Password';
// styles
import {basicStyles} from '../../../theme/basicStyles';
// form
import {Formik} from 'formik';
import {validationSignUp} from '../../../utils/validation';

interface ISignUpScreen {
  navigation: {
    navigate: Function;
  };
}

interface MyFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUpScreen: React.FC<ISignUpScreen> = ({navigation}) => {
  const initialValues: MyFormValues = {
    email: '',
    password: '',
    repeatPassword: '',
  };
  return (
    <View style={[basicStyles.container, styles.container]}>
      <Title text="Sign-up" />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSignUp}
        enableReinitialize={true}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <EmailField
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <PasswordField
              fieldName="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />
            <PasswordField
              fieldName="Repeat password"
              onChangeText={handleChange('repeatPassword')}
              onBlur={handleBlur('repeatPassword')}
              value={values.repeatPassword}
              error={errors.repeatPassword}
              touched={touched.repeatPassword}
            />
            <Button title="Sign up" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <Text
          style={[styles.text, styles.textNavigate]}
          onPress={() => navigation.navigate('Sign In')}>
          Sign In
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {fontSize: 16},
  textNavigate: {marginLeft: 10},
});

export default SignUpScreen;
