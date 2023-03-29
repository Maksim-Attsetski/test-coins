import { usePagination } from 'hooks';
import React, { FC } from 'react';
import { CoinTable } from 'widgets/Coin';

const HomePage: FC = () => {
  const { limit, offset, onMoreContent } = usePagination();

  return (
    <div className='container'>
      <CoinTable limit={limit} offset={offset} />
      <button onClick={onMoreContent}>More</button>
    </div>
  );
};
export default HomePage;
