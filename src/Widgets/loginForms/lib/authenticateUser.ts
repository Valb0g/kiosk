import axios from 'axios';
import { loginStore } from '../model/model';

export const authenticateUser = async (token: string) => {
  axios.defaults.headers.common.Authorization = `Basic ${token}`;
  try {
    await loginStore.fetchPing(token);
  } catch (error) {
    // Обработка ошибки при выполнении fetchPing
    console.error(error);
  }
};
