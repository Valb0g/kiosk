import React from 'react';
import { Spinner } from 'reactstrap';
import './Spinner.scss';

const CustomSpinner = () => (
  <div className="spinner-container">
    <Spinner color="primary" />
  </div>
);

export default CustomSpinner;
