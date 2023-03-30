import React, { FC, memo, useState } from 'react';

import { usePagination } from 'hooks';
import { Button, Gap, Loader, Modal, Pagination } from 'UI';
import { CoinTable, useCoin } from 'widgets/Coin';

const HomePage: FC = () => {
  const { limit, offset, onMoreContent, setOffset } = usePagination();
  const { maxCoinsLength, isLoading } = useCoin({
    limit,
    offset: offset * limit,
  });

  return (
    <div className='container'>
      {isLoading && <Loader text='Be Happy :)' />}
      <CoinTable />
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
