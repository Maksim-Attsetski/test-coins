import React, {
  FC,
  Dispatch,
  memo,
  useEffect,
  useMemo,
  useState,
  SetStateAction,
} from 'react';

import { defaultLastProfile, ILastProfile, useCoin } from 'widgets/Coin';
import { StringHelper } from 'shared';

import s from './Header.module.scss';
import { Button, Gap } from 'UI';

interface IProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
const _Header: FC<IProps> = ({ setIsOpen, isOpen }) => {
  const { coins, userCoins, onCalcChanges, coinsBag } = useCoin();
  const [changes, setChanges] = useState<ILastProfile>(defaultLastProfile);

  const onGetChanges = async () => {
    const allChanges = await onCalcChanges();
    allChanges && setChanges(allChanges);
  };

  const mostPopularCoins = useMemo(() => {
    return (
      <div className={s.coins}>
        {coins.slice(0, 3).map((coin) => (
          <div key={coin.id}>
            <div>{coin.name}</div>
            <div>{StringHelper.getCurrency(coin.priceUsd)}</div>
          </div>
        ))}
      </div>
    );
  }, [coins]);

  const myChanges = useMemo(() => {
    const curPrice =
      changes?.changeInUSD < 10 && changes?.changeInUSD > -9
        ? changes?.changeInUSD?.toFixed(6) + ' $'
        : StringHelper.getCurrency(changes.changeInUSD);

    return (
      <div>
        {StringHelper.getCurrency(coinsBag.balance)}, {curPrice}{' '}
        {changes?.changeInPercent?.toFixed(3)}%
      </div>
    );
  }, [coinsBag]);

  useEffect(() => {
    onGetChanges();
  }, [userCoins]);

  return (
    <div>
      <header className={s.header}>
        <div className={'container ' + s.headerBody}>
          <div>{mostPopularCoins}</div>
          <div>{myChanges}</div>
        </div>
        <div className={'container ' + s.headerSider}>
          <div className={s.burger} onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? '➖' : '➕'}
          </div>
        </div>
      </header>
      <aside className={[s.aside, isOpen && s.active].join(' ')}>
        <Button
          text='❌'
          onClick={() => setIsOpen(false)}
          className={s.close}
        />
        <h3>The most popular coins</h3>
        <Gap y={5} />
        <div>{mostPopularCoins}</div>
        <Gap y={15} />
        <h3>My coins bag changes</h3>
        <Gap y={5} />
        <div>{myChanges}</div>
      </aside>
    </div>
  );
};

export default memo(_Header);
