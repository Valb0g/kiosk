/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Container,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { balanceStore } from '../model/model';
import './Calendar.scss';

export const Calendar: React.FC = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const today = new Date();
  const userLocale = navigator.language;

  const handleToggleModal = () => {
    setSelectedDates([null, null]);
    if (balanceStore.balance !== 0) balanceStore.resetData();
    setModalOpen(!modalOpen);
  };

  const handleDateChange = (dates: [Date, Date]) => {
    setSelectedDates(dates);
  };
  const handleSubmit = async () => {
    const [from, to] = selectedDates;
    const todayISOString = today.toISOString().split('T')[0];
    const currentTime = today.toISOString().split('T')[1];

    const requestBody = {
      from: `${from?.toISOString().split('T')[0]}T00:00:00Z`,
      to: `${to?.toISOString().split('T')[0]}${
        to?.toISOString().split('T')[0] === todayISOString ? `T${currentTime}` : 'T23:59:59Z'
      }`,
    };
    await balanceStore.getBalance(requestBody);
  };
  // Определяем классы стилей для значений deposit, withdraw и balance
  const depositClass = balanceStore.deposit > 0 ? 'text-success' : '';
  const withdrawClass = balanceStore.withdraw > 0 ? 'text-danger' : '';
  const balanceClass = balanceStore.balance < 0 ? 'text-danger' : balanceStore.balance > 0 ? 'text-success' : '';
  return (
    <div>
      <Button color="primary" outline onClick={handleToggleModal}>
        Calculate balance
      </Button>
      <Modal isOpen={modalOpen} toggle={handleToggleModal}>
        <ModalHeader toggle={handleToggleModal}>Select date range</ModalHeader>
        <ModalBody className="calendar-wrap">
          <DatePicker
            locale={userLocale}
            selected={selectedDates[0]}
            onChange={handleDateChange}
            startDate={selectedDates[0]}
            endDate={selectedDates[1]}
            selectsRange
            inline
            maxDate={today}
          />
          <Container>
            {balanceStore.balance !== 0
              ? (
                <div>
                  <div>
                    Deposit for selected period:
                    &nbsp;
                    <span className={depositClass}>
                      {balanceStore.deposit}
                    </span>
                    USD
                  </div>
                  <br />
                  <div>
                    Withdraw for selected period:
                    &nbsp;
                    <span className={withdrawClass}>
                      {balanceStore.withdraw}
                    </span>
                    USD
                  </div>
                  <br />
                  <div>
                    Balance for selected period:
                    &nbsp;
                    <span className={balanceClass}>
                      {balanceStore.balance}
                    </span>
                    USD
                  </div>
                </div>
              )
              : (
                <div>
                  There is no data for
                  {' '}
                  <b>selected</b>
                  {' '}
                  period
                </div>
              )}
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" outline onClick={handleSubmit}>
            Get balance
          </Button>
          <Button color="secondary" outline onClick={handleToggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});
