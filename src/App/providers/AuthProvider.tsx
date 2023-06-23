/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';
import url from 'Shared/consts/url';
import { loginStore } from 'Widgets/loginForms/model/model';
import { authenticateUser } from 'Widgets/loginForms/lib/authenticateUser';

const AuthProvider: React.FC = observer(() => {
  const sessionToken = sessionStorage.getItem('token_kiosk');
  useEffect(() => {
    if (sessionToken && !loginStore.isAuthenticated) {
      authenticateUser(sessionToken);
    }
  }, []);
  return (
    sessionToken
      ? <Outlet />
      : (
        <Navigate to={url.login} />
      )
  );
});

export default AuthProvider;
