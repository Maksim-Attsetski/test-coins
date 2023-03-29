import React, { FC, memo } from 'react';
import { Coin } from 'widgets/Coin';

const CoinPage: FC = (props) => {
  return (
    <div className='container'>
      <Coin />
    </div>
  );
};
export default memo(CoinPage);
