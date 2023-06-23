import * as Yup from 'yup';

export const withdrawValidationSchema = Yup.object().shape({
  secretKey: Yup.string().required('Secret key is required'),
});
