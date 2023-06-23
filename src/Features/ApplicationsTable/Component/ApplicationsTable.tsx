// noinspection JSIgnoredPromiseFromCall

import React from 'react';
import { Table } from 'reactstrap';
import { observer } from 'mobx-react-lite';
import { FormikProps } from 'formik';
import { IApplication } from 'Entities/types/types';
import { TableBody } from 'Entities/TableBody';
import { TableHeader } from 'Entities/TableHeader';
import { IColumns } from 'Entities/TableHeader/model/types';
import './ApplicationsTable.scss';

interface IProps {
  formik?: FormikProps<any>,
  apps: IApplication[],
  onApprove?: (id: number) => void
}
export const ApplicationsTable: React.FC<IProps & IColumns> = observer(({
  formik, apps, onApprove, columns,
}) => (
  <Table>
    <TableHeader columns={columns} />
    <TableBody
      apps={apps}
      formik={formik}
      onApprove={onApprove}
    />
  </Table>
));
