import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required'),
});
