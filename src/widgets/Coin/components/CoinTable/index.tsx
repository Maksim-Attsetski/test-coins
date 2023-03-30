import React, { FC, memo, useMemo, useState } from 'react';

import { routeNames } from 'navigation/types';
import { useNavigate } from 'react-router-dom';

import { StringHelper } from 'shared';
import { ICeil, InputModal, Table } from 'UI';
import { useCoin, ICoin } from 'widgets/Coin';

import s from './CoinTable.module.scss';
import { useActions } from 'hooks';

interface IProps {
  limit: number;
  offset: number;
}

const CoinTable: FC<IProps> = ({ limit, offset }) => {
  const navigate = useNavigate();
  const {
    coins,
    userCoins,
    onAddUserCoin,
    onDeleteUserCoin,
    onEditUserCoin,
    coinsBag,
  } = useCoin({
    limit,
    offset: offset * limit,
  });
  const { action } = useActions();

  const [selectedCoin, setSelectedCoin] = useState<ICoin | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const coinsRows: ICeil[] = useMemo(() => {
    return coins.map(({ id, ...coin }) => {
      const isExist = userCoins?.find((el) => el.id === id);
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
              setSelectedCoin({ id, ...coin });
              isExist ? setIsDeleteModalOpen(true) : setIsAddModalOpen(true);
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

  const onBuyCoins = (coinCount: string) => {
    if (!selectedCoin?.id) return;

    try {
      const priceForCount = selectedCoin.priceUsd * +coinCount;
      if (priceForCount > coinsBag.balance) {
        throw new Error(
          'Не хватает ' + (priceForCount - coinsBag.balance) + '$ на балансе'
        );
      }

      onAddUserCoin({ id: selectedCoin?.id, count: +coinCount });
      action.setProfileAC({
        ...coinsBag,
        balance: coinsBag.balance - priceForCount,
      });
    } catch (error: any) {
      alert(error?.message);
    } finally {
      setIsAddModalOpen(false);
    }
  };

  const onSellCoins = (count: string) => {
    if (!selectedCoin?.id) return;

    const currentUserCoin = userCoins.find(
      (coin) => coin.id === selectedCoin.id
    );

    if (!currentUserCoin) return;

    if (currentUserCoin.count === +count) {
      onDeleteUserCoin(selectedCoin?.id);
    } else {
      onEditUserCoin({
        id: selectedCoin?.id,
        count: currentUserCoin.count - +count,
      });
    }

    action.setProfileAC({
      ...coinsBag,
      balance: coinsBag.balance + selectedCoin.priceUsd * +count,
    });
    setIsDeleteModalOpen(false);
  };

  return (
    <div className='container'>
      <InputModal
        title='How much coins do you wanna buy?'
        onConfirm={onBuyCoins}
        isVisible={isAddModalOpen}
        setIsVisible={setIsAddModalOpen}
      />
      <InputModal
        title='How much coins do you wanna sell?'
        onConfirm={onSellCoins}
        isVisible={isDeleteModalOpen}
        setIsVisible={setIsDeleteModalOpen}
      />
      <Table rows={coinsRows} head={coinsHead} onCeilClick={onOpenCeil} />
    </div>
  );
};

export default memo(CoinTable);
