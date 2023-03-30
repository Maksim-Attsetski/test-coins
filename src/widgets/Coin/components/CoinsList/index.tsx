import { useActions } from 'hooks';
import React, { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StringHelper } from 'shared';
import { Button, Gap, List } from 'UI';

import { ICoin, useCoin } from 'widgets/Coin';

import s from './CoinsList.module.scss';

const CoinsList: FC = () => {
  const { onGetCoins, userCoins, onDeleteUserCoin, coinsBag } = useCoin();
  const { action } = useActions();
  const navigate = useNavigate();

  const [fullUserCoins, setFullUserCoins] = useState<ICoin[]>([]);

  const onDeleteCoin = (coin: ICoin) => {
    const curCoin = userCoins.find((el) => el.id === coin.id);

    if (curCoin) {
      action.setProfileAC({
        ...coinsBag,
        balance: coinsBag.balance + coin.priceUsd * curCoin?.count,
      });
      onDeleteUserCoin(coin.id);
      setFullUserCoins((prev) => prev.filter((el) => el.id !== coin.id));
    }
  };

  useEffect(() => {
    (async () => {
      if (userCoins?.length) {
        const ids = userCoins.map((coin) => coin.id).join(',');
        const response = await onGetCoins({ ids }, true);

        response.data && setFullUserCoins(response.data);
      }
    })();
  }, []);

  return (
    <div>
      <Button text='Go back' onClick={() => navigate(-1)} />
      <Gap y={15} />
      <h3>
        Your balance: {StringHelper.getCurrency(coinsBag.balance)} (in coins –{' '}
        {StringHelper.getCurrency(coinsBag.balanceInCoins)})
      </h3>
      <Gap y={15} />
      <h3>
        Your balance 1 day before:{' '}
        {StringHelper.getCurrency(coinsBag.balance1dbefore)}
      </h3>
      <Gap y={15} />
      <h2>Your coins</h2>
      <Gap y={15} />
      <List
        data={fullUserCoins}
        emptyElement={<div>No cins :{'('}</div>}
        renderItem={(coin: ICoin) => (
          <div className={s.coinsContainer}>
            <div>{coin.name}</div>
            <Button text='Delete' onClick={() => onDeleteCoin(coin)} />
          </div>
        )}
      />
    </div>
  );
};

export default memo(CoinsList);
