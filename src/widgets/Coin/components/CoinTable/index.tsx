import React, { FC, memo, useMemo } from 'react';

import { routeNames } from 'navigation/types';
import { useNavigate } from 'react-router-dom';

import { StringHelper } from 'shared';
import { ICeil, Table } from 'UI';
import useCoin from '../../useCoin';

import s from './CoinTable.module.scss';

interface IProps {
  limit: number;
  offset: number;
}

const CoinTable: FC<IProps> = ({ limit, offset }) => {
  const navigate = useNavigate();
  const { coins, userCoins, onAddUserCoin, onDeleteUserCoin } = useCoin({
    limit,
    offset,
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

export default memo(CoinTable);
