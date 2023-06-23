import React from 'react';
import './index.scss';
import MainLayout from 'App/mainLayout/MainLayout';
import { Provider } from 'mobx-react';
import { withProviders } from './providers';
import RootRouter from './providers/RootRouter';
import { rootStore } from './model/rootModel';

function Index() {
  return (
    <Provider store={rootStore}>
      <MainLayout>
        <RootRouter />
      </MainLayout>
    </Provider>
  );
}

export default withProviders(Index);
