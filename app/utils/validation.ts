import * as yup from 'yup';

export const validationSignUp = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Please enter a registered email'),
  password: yup.string().required('Please enter a password').min(6, 'Password must have at least 6 characters '),
  repeatPassword: yup
    .string()
    .required('Please repeat a password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const validationSignIn = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Please enter a registered email'),
  password: yup.string().required('Please enter a password'),
});

export const validationTaskForm = yup
  .object()
  .shape({ title: yup.string().required('pls, enter title'), project: yup.string().required('pls, enter project') });
