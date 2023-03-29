import React, { FC, memo, useEffect, useMemo, useState } from 'react';

import { defaultLastProfile, ILastProfile, useCoin } from 'widgets/Coin';
import { StringHelper } from 'shared';

import s from './Header.module.scss';

interface IProps {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
}
const _Header: FC<IProps> = ({ setIsOpen, isOpen }) => {
  const { coins, userCoins, onCalcChanges, lastProfile } = useCoin();
  const [changes, setChanges] = useState<ILastProfile>(defaultLastProfile);

  const onGetChanges = async () => {
    const allChanges = await onCalcChanges();
    allChanges && setChanges(allChanges);
  };

  const mostPopularCoins = useMemo(() => coins.slice(0, 3), [coins]);

  const changesText = useMemo(() => {
    const curPrice =
      changes?.price < 10
        ? changes?.price?.toFixed(6)
        : StringHelper.getCurrency(changes.price);

    return `${curPrice} (${changes?.percent?.toFixed(3)}%)`;
  }, [changes]);

  useEffect(() => {
    onGetChanges();
  }, [userCoins, lastProfile]);

  return (
    <header className={s.header}>
      <div className={'container ' + s.headerBody}>
        <div className={s.coins}>
          {mostPopularCoins.map((coin) => (
            <div key={coin.id}>
              <div>{coin.name}</div>
              <div>{StringHelper.getCurrency(coin.priceUsd)}</div>
            </div>
          ))}
        </div>
        <div>
          <div>{changesText}</div>
        </div>
      </div>
    </header>
  );
};

export default memo(_Header);
