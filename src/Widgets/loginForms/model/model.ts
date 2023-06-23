/* eslint-disable indent */
import {
  action, configure, makeAutoObservable,
} from 'mobx';
import axios from 'axios';
import { baseUrl } from 'Shared/consts/url';

configure({
  enforceActions: 'never',
});
class LoginStore {
  token = '';

  isLoading = false;

  error = '';

  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ---Login actions---
  @action
  async fetchPing(token: string) {
    try {
      this.isLoading = true;
      await axios<string>({
        method: 'get',
        baseURL: baseUrl,
        url: 'api/ping',
      });
      if (!this.isAuthenticated) this.isAuthenticated = true;
      this.setToken(token);
      this.isLoading = false;
    } catch (e) {
      this.error = 'The username or password is incorrect';
      this.isLoading = false;
      throw this.error;
    }
  }

  // ---Set Token---
  @action
  setToken(token: string) {
    this.token = token;
    if (!sessionStorage.getItem('token_kiosk')) sessionStorage.setItem('token_kiosk', `${this.token}`);
  }
}
export const loginStore = new LoginStore();
