/* eslint-disable indent */
import {
  action, configure, makeAutoObservable,
} from 'mobx';

configure({
  enforceActions: 'never',
});
class ModalStore {
  order_id: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

// ---Order modal ID---
  @action
  setModal(id: number | null) {
    this.order_id = id;
  }
}
export const modalStore = new ModalStore();
