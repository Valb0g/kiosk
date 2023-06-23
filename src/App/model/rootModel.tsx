import { loginStore } from 'Widgets/loginForms/model/model';
import { withdrawStore } from 'Widgets/withdrawList/model/model';
import { depositStore } from 'Widgets/depositList/model/model';
import { historyStore } from 'Widgets/historyList/model/model';
import { modalStore } from 'Entities/ApproveModal/model/model';
import { balanceStore } from 'Entities/Calendar/model/model';

class RootModel {
  loginStore: typeof loginStore;

  withdrawStore: typeof withdrawStore;

  depositStore: typeof depositStore;

  historyStore: typeof historyStore;

  modalStore: typeof modalStore;

  balanceStore: typeof balanceStore;

  constructor() {
    this.loginStore = loginStore;
    this.withdrawStore = withdrawStore;
    this.depositStore = depositStore;
    this.historyStore = historyStore;
    this.modalStore = modalStore;
    this.balanceStore = balanceStore;
  }
}
export const rootStore = new RootModel();
