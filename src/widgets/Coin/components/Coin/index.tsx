import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dateHelper, StringHelper } from 'shared';
import { AreaChart, Button } from 'UI';
import { ICoin, ICoinHistory, useCoin } from 'widgets/Coin';

import s from './Coin.module.scss';

const Coin: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onGetOneCoin, onGetHistory } = useCoin();
  const [coin, setCoin] = useState<null | ICoin>(null);
  const [history, setHistory] = useState<ICoinHistory[]>([]);

  const onGetCoin = async () => {
    if (!id) return;

    const data = await onGetOneCoin(id);
    const response = await onGetHistory(id);
    setHistory(response);
    setCoin(data);
  };

  const dataForChart = useMemo(() => {
    return {
      data: history.map((el) => el.priceUsd),
      labels: history.map((el) => dateHelper.getBeautifulDate(el.time)),
    };
  }, [history]);

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

      <AreaChart {...dataForChart} coinName={coin.name} />
    </div>
  ) : (
    <div>
      <div>Coin was not found</div>
    </div>
  );
};
export default memo(Coin);
