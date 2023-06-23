import React, { ReactNode } from 'react';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import './MainLayout.scss';
import { loginStore } from 'Widgets/loginForms/model/model';
import { Header } from 'Entities/Header';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = observer(({ children }) => {
  const sessionToken = sessionStorage.getItem('token_kiosk');
  const isLogin = loginStore.isAuthenticated || sessionToken;
  return (
    <div>
      {isLogin && <Header />}
      <Container
        fluid
      >
        {children}
      </Container>
    </div>
  );
});

export default MainLayout;
