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
class DepositStore {
  applications: IApplication[] = [];

  isLoading = false;

  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  // ---Deposit actions---
  @action
  async approveDepositApp(id: number) {
    try {
      this.isLoading = true;
      await axios<IApplication[]>({
        method: 'put',
        baseURL: baseUrl,
        url: `api/deposit/${id}`,
      });
      modalStore.setModal(null);
      this.isLoading = false;
      await this.fetchDeposit();
    } catch (e) {
      this.error = (e as Error).message;
      this.isLoading = false;
      throw this.error;
    }
  }

  @action
  async fetchDeposit() {
    try {
      this.isLoading = true;
      const resp = await axios<IApplication[]>({
        method: 'post',
        baseURL: baseUrl,
        url: 'api/order-list',
        data: { approved: false, type: 'DEPOSIT' },
      });
      this.applications = resp.data;
      this.isLoading = false;
    } catch (e) {
      this.error = (e as Error).message;
      this.isLoading = false;
    }
  }
}
export const depositStore = new DepositStore();
