import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { FormikProps } from 'formik';
import { observer } from 'mobx-react';
import url from 'Shared/consts/url';
import './ApproveModal.scss';
import { FormComponentWithdraw } from 'Entities/FormComponentWithdraw';

import { modalStore } from '../model/model';

interface IProps {
    id: number
    onApprove: () => void;
    formik?: FormikProps<any>
}
export const ApproveModal: React.FC<IProps> = observer(({
  onApprove, formik, id,
}) => {
  const { pathname } = useLocation();

  const toggle = (order_id: number | null) => modalStore.setModal(order_id);
  return (
    <div>
      <Button
        tabIndex={-1}
        color="primary"
        outline
        onClick={() => toggle(id)}
      >
        Approve
      </Button>
      <Modal isOpen={id === modalStore.order_id} toggle={() => toggle(null)}>
        <ModalHeader>Confirm approval</ModalHeader>
        <ModalBody className="form-wrap">
          Do you really want to approve?
          {/* Добавление формы для секретного ключа */}
          {pathname === url.withdraw && formik && <FormComponentWithdraw formik={formik} />}
        </ModalBody>
        <ModalFooter>
          <Button
            tabIndex={-1}
            type="submit"
            color="primary"
            outline
            disabled={formik && (!formik.dirty || !formik.isValid)}
            onClick={() => onApprove()}
          >
            Approve
          </Button>
          {' '}
          <Button
            tabIndex={-1}
            color="secondary"
            outline
            onClick={() => toggle(null)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});
