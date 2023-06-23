/* eslint-disable indent */
import {
  action, configure, makeAutoObservable,
} from 'mobx';
import axios from 'axios';
import { baseUrl } from 'Shared/consts/url';
import { IApplication } from 'Entities/types/types';
import { modalStore } from 'Entities/ApproveModal/model/model';

configure({
  enforceActions: 'never',
});
class WithdrawStore {
  applications: IApplication[] = [];

  isLoading = false;

  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  // ---Withdraw actions---
  @action
  async fetchWithdraw() {
    try {
      this.isLoading = true;
      const resp = await axios<IApplication[]>({
        method: 'post',
        baseURL: baseUrl,
        url: 'api/order-list',
        data: { approved: false, type: 'WITHDRAW' },
      });
      this.applications = resp.data;
      this.isLoading = false;
    } catch (e) {
      this.error = (e as Error).message;
      this.isLoading = false;
    }
  }

  @action
  async approveWithdrawApp(code: string, order_id: number) {
    try {
      this.isLoading = true;
      await axios<IApplication[]>({
        method: 'put',
        baseURL: baseUrl,
        url: 'api/orders',
        data: { code, order_id },
      });
      modalStore.setModal(null);
      this.isLoading = false;
      await this.fetchWithdraw();
    } catch (e) {
      this.error = 'The secret code is incorrect';
      this.isLoading = false;
      throw this.error;
    }
  }
}
export const withdrawStore = new WithdrawStore();
