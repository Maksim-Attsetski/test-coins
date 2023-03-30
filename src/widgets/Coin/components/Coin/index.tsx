import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dateHelper, StringHelper, TIntervalsText } from 'shared';
import { AreaChart, Button, Gap } from 'UI';
import { ICoin, ICoinHistory, useCoin } from 'widgets/Coin';

import s from './Coin.module.scss';

const Coin: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onGetOneCoin, onGetHistory } = useCoin();
  const [coin, setCoin] = useState<null | ICoin>(null);
  const [history, setHistory] = useState<ICoinHistory[]>([]);
  const [sortBy, setSortBy] = useState<TIntervalsText>('month');

  const onGetCoin = async () => {
    if (!id) return;

    const data = await onGetOneCoin(id);
    const response = await onGetHistory(id, sortBy);
    setHistory(response);
    setCoin(data);
  };

  const dataForChart = useMemo(() => {
    return {
      data: history.map((el) => el.priceUsd),
      labels: history.map((el) =>
        sortBy === 'day'
          ? dateHelper.getTimeString(el.time)
          : dateHelper.getBeautifulDate(el.time)
      ),
    };
  }, [history]);

  useEffect(() => {
    onGetCoin();
  }, [id, sortBy]);

  return id && coin ? (
    <div>
      <div className={s.btnContainer}>
        <Button text='Go back' onClick={() => navigate(-1)} />
        <Button
          text={'Sort by ' + sortBy}
          onClick={() =>
            setSortBy((prev) => (prev === 'day' ? 'month' : 'day'))
          }
        />
      </div>
      <div>
        Coin name – {coin.name} {coin.symbol}
      </div>
      <Gap y={5} />
      <div>Rank – {coin.rank}</div>
      <Gap y={5} />
      <div>Market cap – {StringHelper.getCurrency(coin.marketCapUsd)}</div>
      <Gap y={5} />
      <div>Price – {StringHelper.getCurrency(coin.priceUsd)}</div>
      <Gap y={15} />
      <AreaChart {...dataForChart} coinName={coin.name} />
    </div>
  ) : (
    <div>
      <div>Coin was not found</div>
    </div>
  );
};
export default memo(Coin);
