import { usePagination } from 'hooks';
import React, { FC, memo } from 'react';
import { Button, Gap, Pagination } from 'UI';
import { CoinTable, useCoin } from 'widgets/Coin';

const HomePage: FC = () => {
  const { limit, offset, onMoreContent, setOffset } = usePagination();
  const { maxCoinsLength } = useCoin();

  return (
    <div className='container'>
      <CoinTable limit={limit} offset={offset} />
      <Gap y={10} />
      <Button onClick={onMoreContent} text='More' />
      <Pagination
        page={offset}
        maxPage={maxCoinsLength ? Math.floor(maxCoinsLength / limit) : 10}
        onChange={setOffset}
      />
    </div>
  );
};
export default memo(HomePage);
