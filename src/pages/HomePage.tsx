import { routeNames } from 'navigation/types';
import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StringHelper } from 'shared';
import { ICeil, Table } from 'UI';
import { useCoin } from 'widgets/Coin';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { coins, userCoins, onAddUserCoin, onDeleteUserCoin } = useCoin({
    limit: 20,
    offset: 0,
  });

  const coinsRows: ICeil[] = useMemo(() => {
    return coins.map(({ id, ...coin }) => {
      const isExist = userCoins.includes(id);
      return {
        id,
        data: [
          { text: coin.name },
          { text: StringHelper.getCurrency(coin.priceUsd) },
          { text: coin.rank },
          { text: StringHelper.getCurrency(coin.marketCapUsd) },
          {
            text: isExist ? 'Remove' : 'Add',
            onClick: () => {
              isExist ? onDeleteUserCoin(id) : onAddUserCoin(id);
            },
          },
        ],
      };
    });
  }, [coins, userCoins]);

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
