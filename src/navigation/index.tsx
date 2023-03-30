import React, { FC, memo } from 'react';
import { Routes, Route } from 'react-router-dom';

import { screens } from 'pages';
import { routeNames } from './types';
import { Layout } from 'widgets/Layout';
import { useCoin } from 'widgets/Coin';

const Navigation: FC = () => {
  const {} = useCoin({ limit: 10 });

  return (
    <>
      <div className='main-circle' />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<screens.Home />} path={routeNames.Home} />
          <Route element={<screens.Notfound />} path={routeNames.Notfound} />
          <Route element={<screens.Coin />} path={routeNames.Coin + ':id'} />
          <Route element={<screens.CoinBag />} path={routeNames.CoinsBag} />
        </Route>
      </Routes>
    </>
  );
};

export default memo(Navigation);
