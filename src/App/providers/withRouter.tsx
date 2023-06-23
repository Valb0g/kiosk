import { BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import CustomSpinner from '../../Shared/Spinner/customSpinner';

export const withRouter = (component: () => React.ReactNode) => () => (
  <BrowserRouter>
    <Suspense fallback={<CustomSpinner />}>
      {component()}
    </Suspense>
  </BrowserRouter>
);
