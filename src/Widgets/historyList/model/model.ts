/* eslint-disable indent */
import {
  action, configure, makeAutoObservable,
} from 'mobx';
import axios from 'axios';
import { baseUrl } from 'Shared/consts/url';
import { IApplication } from 'Entities/types/types';

configure({
  enforceActions: 'never',
});
class HistoryStore {
  applications: IApplication[] = [];

  isLoading = false;

  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  // ---History actions---
  @action
  async fetchHistory() {
    try {
      this.isLoading = true;
      const resp = await axios<IApplication[]>({
        method: 'post',
        baseURL: baseUrl,
        url: 'api/order-list',
        data: { approved: true },
      });
      this.applications = resp.data;
      this.isLoading = false;
    } catch (e) {
      this.error = (e as Error).message;
      this.isLoading = false;
    }
  }
}
export const historyStore = new HistoryStore();
