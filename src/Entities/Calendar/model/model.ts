/* eslint-disable indent */
import { action, configure, makeAutoObservable } from 'mobx';
import axios from 'axios';
import { baseUrl } from 'Shared/consts/url';
import { IBalanceResponse, IRangeDates } from './types';

configure({
  enforceActions: 'never',
});
class BalanceStore {
  isLoading = false;

  error = '';

  balance = 0;

  deposit = 0;

  withdraw = 0;

  constructor() {
    makeAutoObservable(this);
  }

  // ---DatePicker actions---
  @action
  async getBalance(requestBody: IRangeDates) {
    try {
      this.isLoading = true;
      const response = await axios<IBalanceResponse>({
        method: 'post',
        baseURL: baseUrl,
        url: 'api/net-balance',
        data: requestBody,
      });
      const { deposit, withdraw } = response.data;
      this.deposit = +deposit.toFixed(2);
      this.withdraw = +withdraw.toFixed(2);
      this.balance = this.deposit - this.withdraw;
      this.balance = +this.balance.toFixed(2);
      this.isLoading = false;
    } catch (e) {
      this.error = (e as Error).message;
      this.isLoading = false;
    }
  }

  @action
  resetData() {
    this.deposit = 0;
    this.withdraw = 0;
    this.balance = 0;
  }
}
export const balanceStore = new BalanceStore();
