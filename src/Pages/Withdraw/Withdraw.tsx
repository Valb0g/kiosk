/* eslint-disable react-hooks/exhaustive-deps */
// noinspection JSIgnoredPromiseFromCall

import React, { useEffect } from 'react';
import './Withdraw.scss';
import { WithdrawList } from 'Widgets/withdrawList';
import { withdrawStore } from 'Widgets/withdrawList/model/model';

const Withdraw = () => {
  useEffect(() => {
    const timer = setTimeout(() => withdrawStore.fetchWithdraw());
    return () => clearTimeout(timer);
  }, []);
  return (
    <WithdrawList />
  );
};
export default Withdraw;
