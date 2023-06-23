/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { FormikProps } from 'formik';
import {
  Input, Form, Label, FormFeedback,
} from 'reactstrap';
import cx from 'classnames';
import './FormComponentWithdraw.scss';
import { IFormValues } from '../model/types';

interface IProps {
    formik: FormikProps<IFormValues>
}
export const FormComponentWithdraw: React.FC<IProps> = ({ formik }) => {
  useEffect(() => {
    formik.handleReset();
  }, []);
  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="approve-form">
        <Label htmlFor="secretKey">Secret Key</Label>
        <Input
          id="secretKey"
          className="input"
          maxLength={20}
          autoComplete="off"
          type="text"
          {...formik.getFieldProps('secretKey')}
          invalid={!!formik.errors.secretKey}
        />
        {formik.errors.secretKey && (
        <FormFeedback className={cx('error-message')}>
          {formik.errors.secretKey}
        </FormFeedback>
        )}
      </div>
    </Form>
  );
};
