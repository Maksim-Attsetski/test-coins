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
      data: [
        { text: coin.name },
        { text: coin.priceUsd },
        { text: coin.rank },
        { text: coin.marketCapUsd },
        {
          text: 'Add',
          onClick: () => {
            console.log('cfff');
          },
        },
      ],
    }));
  }, [coins]);

  const coinsHead: string[] = useMemo(
    () => ['Name', 'Price', 'Rank', 'Market cap', 'Action'],
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
