import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'UI';
import { ICoin, useCoin } from 'widgets/Coin';

import s from './Coin.module.scss';

const Coin: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onGetOneCoin } = useCoin();
  const [coin, setCoin] = useState<null | ICoin>(null);

  const onGetCoin = async () => {
    if (!id) return;

    const data = await onGetOneCoin(id);
    setCoin(data);
  };

  useEffect(() => {
    onGetCoin();
  }, [id]);

  return id && coin ? (
    <div>
      <Button text='Go back' onClick={() => navigate(-1)} />
      <div>
        {coin.name} {coin.symbol}
      </div>
      <div>{coin.rank}</div>
      <div>{coin.marketCapUsd}</div>
      <div>{coin.priceUsd}</div>
    </div>
  ) : (
    <div>
      <div>Coin was not found</div>
    </div>
  );
};
export default memo(Coin);
