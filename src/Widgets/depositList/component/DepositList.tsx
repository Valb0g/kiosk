import React from 'react';
import { observer } from 'mobx-react';
import { ApplicationsTable } from 'Features/ApplicationsTable';
import { depositStore } from '../model/model';
import { depositColumns } from '../lib/columns';

export const DepositList = observer(() => {
  const handleApprove = async (id: number) => {
    await depositStore.approveDepositApp(id);
  };
  return (
    <div>
      <h1>Deposit Page</h1>
      <ApplicationsTable
        apps={depositStore.applications}
        onApprove={handleApprove}
        columns={depositColumns}
      />
    </div>
  );
});
