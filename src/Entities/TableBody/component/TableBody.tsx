import React from 'react';
import { IApplication } from 'Entities/types/types';
import { toJS } from 'mobx';
import { FormikProps } from 'formik';
import { observer } from 'mobx-react';
import { ApproveModal } from 'Entities/ApproveModal';
import './TableBody.scss';

interface IProps {
  apps: IApplication[]
  formik?: FormikProps<any>
  onApprove?: (id: number) => void
}

export const TableBody: React.FC<IProps> = observer(({
  apps,
  formik,
  onApprove,
}) => {
  const applications = toJS(apps); // Оборачиваем значение в действие MobX
  const userLocale = navigator.language;
  const handleApprove = (id: number) => (onApprove && onApprove(id));
  const formatDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    return new Intl.DateTimeFormat(userLocale).format(dateTime);
  };
  return (
    <tbody>
      {applications.map((application, index) => (
        <tr key={index}>
          <td>{application.id}</td>
          <td>{`$${application.amount}`}</td>
          <td>{formatDateTime(application.created_at)}</td>
          <td>{application.approved ? formatDateTime(application.closed_at) : 'Active'}</td>
          <td>
            {!application.approved
              ? (
                <ApproveModal
                  formik={formik}
                  onApprove={() => handleApprove(application.id)}
                  id={application.id}
                />
              )
              : <span>Approved</span>}
          </td>
        </tr>
      ))}
    </tbody>
  );
});
