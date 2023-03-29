import { routeNames } from 'navigation/types';
import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICeil, Table } from 'UI';
import { useCoin } from 'widgets/Coin';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { coins } = useCoin({ limit: 20, offset: 1 });

  const coinsRows: ICeil[] = useMemo(() => {
    return coins.map((coin) => ({
      id: coin.id,
      data: [coin.name, coin.priceUsd, coin.rank, coin.marketCapUsd],
    }));
  }, [coins]);

  const coinsHead: string[] = useMemo(
    () => ['Name', 'Price', 'Rank', 'Market cap'],
    [coins]
  );

  const onOpenCeil = (ceil: ICeil) => {
    navigate(routeNames.Coin + ceil.id);
  };

  return (
    <div className='container'>
      <Table rows={coinsRows} head={coinsHead} onCeilClick={onOpenCeil} />
    </div>
  );
};

export default HomePage;
