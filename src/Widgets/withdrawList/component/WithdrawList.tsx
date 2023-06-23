import React from 'react';
import { useFormik } from 'formik';
import { ApplicationsTable } from 'Features/ApplicationsTable';
import { observer } from 'mobx-react';
import { IFormValues } from 'Entities/FormComponentWithdraw/model/types';
import { withdrawValidationSchema } from '../schema/schema';
import { withdrawStore } from '../model/model';
import { withdrawColumns } from '../lib/columns';

const initialValues: IFormValues = {
  secretKey: '',
  id: null,
};
export const WithdrawList = observer(() => {
  const handleSubmit = async (secretKey, order_id, formik) => {
    try {
      await withdrawStore.approveWithdrawApp(secretKey, order_id);
    } catch (e) {
      formik.setFieldError('secretKey', withdrawStore.error);
    }
  };
  const formik = useFormik<IFormValues>({
    initialValues,
    validationSchema: withdrawValidationSchema,
    onSubmit: (values) => handleSubmit(values.secretKey, Number(values.id), formik),
  });
  const handleApprove = (id: number) => {
    formik.setFieldValue('id', id);
    formik.handleSubmit();
  };
  return (
    <div>
      <h1>Withdraw Page</h1>
      <ApplicationsTable
        formik={formik}
        apps={withdrawStore.applications}
        onApprove={handleApprove}
        columns={withdrawColumns}
      />
    </div>
  );
});
