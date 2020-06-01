import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// firebase
import firebase from '../../../db/firebaseDb';
// components
import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';
import EmailField from '../../../components/Form/Email/Email';
import PasswordField from '../../../components/Form/Password/Password';
// styles
import { basicStyles } from '../../../theme/basicStyles';
// form
import { Formik } from 'formik';
import { validationSignIn } from '../../../utils/validation';
// routes
import { authRoutes } from '../../../navigation/routes';

interface ISignInScreen {
  navigation: {
    navigate: Function;
  };
}

interface MyFormValues {
  email: string;
  password: string;
  error: null;
}

const SignInScreen: React.FC<ISignInScreen> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: MyFormValues = {
    email: '',
    password: '',
    error: null,
  };

  return (
    <View style={[basicStyles.container, styles.container, basicStyles.bgScreen]} testID='signIn'>
      <Title text='Sign-in' style={[basicStyles.header, basicStyles.screenHeader]} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setIsLoading(true);
          firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .catch((err) => {
              actions.setErrors({ error: err.message });
            })
            .finally(() => setIsLoading(false));
        }}
        validationSchema={validationSignIn}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.error} testID='signInError'>
              {errors.error}
            </Text>
            <EmailField
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <PasswordField
              fieldName='Password'
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
              touched={touched.password}
              testID='password'
            />

            <Button title='Sign in' onPress={handleSubmit} loading={isLoading} testID='signInBtn' />
          </View>
        )}
      </Formik>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Don’t have an account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(authRoutes.SIGN_UP)}>
          <Text style={[styles.text, styles.textNavigate]} testID='toSignUp'>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: { fontSize: 16 },
  textNavigate: { marginLeft: 10 },
  error: {
    color: 'red',
  },
});

export default SignInScreen;
