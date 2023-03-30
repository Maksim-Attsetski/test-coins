import React, { FC, memo } from 'react';
import { CoinsList } from 'widgets/Coin';

const CoinBag: FC = () => {
  return (
    <div className='container'>
      <CoinsList />
    </div>
  );
};
export default memo(CoinBag);
