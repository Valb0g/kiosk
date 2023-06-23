/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSIgnoredPromiseFromCall

import React, { useEffect } from 'react';
import './History.scss';
import { HistoryList } from 'Widgets/historyList/index';
import { historyStore } from 'Widgets/historyList/model/model';

const History = () => {
  useEffect(() => {
    // исключить двойной render
    const timer = setTimeout(() => historyStore.fetchHistory());
    return () => clearTimeout(timer);
  }, []);
  return (
    <HistoryList />
  );
};
export default History;
