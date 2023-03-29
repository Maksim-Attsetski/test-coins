import { usePagination } from 'hooks';
import React, { FC, memo } from 'react';
import { Button, Gap } from 'UI';
import { CoinTable } from 'widgets/Coin';

const HomePage: FC = () => {
  const { limit, offset, onMoreContent } = usePagination();

  return (
    <div className='container'>
      <CoinTable limit={limit} offset={offset} />
      <Gap y={10} />
      <Button onClick={onMoreContent} text='More' />
    </div>
  );
};
export default memo(HomePage);
