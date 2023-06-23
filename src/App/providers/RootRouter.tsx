import React from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import url from 'Shared/consts/url';

import AuthProvider from './AuthProvider';

const Withdraw = React.lazy(() => import('Pages/Withdraw/Withdraw'));
const Deposit = React.lazy(() => import('Pages/Deposit/Deposit'));
const History = React.lazy(() => import('Pages/History/History'));
const Login = React.lazy(() => import('Pages/Login/Login'));

const RootRouter = () => (
  <Routes>
    <Route element={<AuthProvider />}>
      <Route path={url.history} element={<History />} />
      <Route path={url.withdraw} element={<Withdraw />} />
      <Route path={url.deposit} element={<Deposit />} />
    </Route>
    <Route path={url.login} element={<Login />} />
    <Route path="*" element={<Navigate to={url.history} />} />
  </Routes>
);

export default RootRouter;
