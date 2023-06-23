/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import { FormikProps, useFormik } from 'formik';
import {
  FormGroup, Label, Input, Button, FormFeedback, Form,
} from 'reactstrap';

import url from 'Shared/consts/url';
import './LoginForms.scss';
import { useNavigate } from 'react-router-dom';
import { loginStore } from '../model/model';
import { ILoginFormValues } from '../model/types';
import { loginValidationSchema } from '../schema/schema';

const initialValues: ILoginFormValues = {
  username: '',
  password: '',
};
export const LoginForms: React.FC = observer(() => {
  const navigate = useNavigate();
  const sessionToken = sessionStorage.getItem('token_kiosk');
  useEffect(() => {
    if (sessionToken) navigate(url.history);
  }, [sessionToken]);

  const setAuthorizationHeader = async (token: string) => {
    axios.defaults.headers.common.Authorization = `Basic ${token}`;
    await loginStore.fetchPing(token);
  };

  const handleSubmit = async (values: ILoginFormValues, formik: FormikProps<ILoginFormValues>) => {
    const { username, password } = values;
    const data = `${username}:${password}`;
    const token = btoa(data);
    try {
      await setAuthorizationHeader(token);
    } catch (e) {
      formik.setFieldError('password', loginStore.error);
    }
  };

  const formik = useFormik<ILoginFormValues>({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => handleSubmit(values, formik),
  });
  return (
    <div>
      <h1 className="h1">Authorization</h1>
      <div className="form-wrap-login">
        <Form onSubmit={formik.handleSubmit} className="auth-form">
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              autoComplete="off"
              {...formik.getFieldProps('username')}
              invalid={formik.touched.username && !!formik.errors.username}
            />
            <FormFeedback>{formik.errors.username}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...formik.getFieldProps('password')}
              invalid={formik.touched.password && !!formik.errors.password}
            />
            <FormFeedback>{formik.errors.password}</FormFeedback>
          </FormGroup>

          <Button outline type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>
            {formik.isSubmitting ? 'Authorization...' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
});
