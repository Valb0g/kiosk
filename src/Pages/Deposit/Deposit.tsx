/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSIgnoredPromiseFromCall

import React, { useEffect } from 'react';
import './Deposit.scss';
import { DepositList } from 'Widgets/depositList/index';
import { depositStore } from 'Widgets/depositList/model/model';

const Deposit = () => {
  useEffect(() => {
    const timer = setTimeout(() => depositStore.fetchDeposit(), 0);
    return () => clearTimeout(timer);
  }, []);
  return (
    <DepositList />
  );
};
export default Deposit;
