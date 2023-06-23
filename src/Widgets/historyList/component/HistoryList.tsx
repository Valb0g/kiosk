import React from 'react';
import { observer } from 'mobx-react';
import { ApplicationsTable } from 'Features/ApplicationsTable';
import { Calendar } from 'Entities/Calendar';
import { historyStore } from '../model/model';
import { historyColumns } from '../lib/columns';
import './HistoryList.scss';

export const HistoryList = observer(() => (
  <div>
    <div
      className="header"
    >
      <h1> History Page </h1>
      <Calendar />
    </div>
    <ApplicationsTable
      columns={historyColumns}
      apps={historyStore.applications}
    />
  </div>
));
