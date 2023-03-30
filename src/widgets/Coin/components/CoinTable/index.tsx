import React, { FC, memo, useMemo, useState } from 'react';

import { routeNames } from 'navigation/types';
import { useNavigate } from 'react-router-dom';

import { StringHelper } from 'shared';
import { ICeil, Table } from 'UI';
import { useCoin, ICoin, IUserCoin } from 'widgets/Coin';

import AddCoinModal from '../AddCoinModal';
import SellCoinModal from '../SellCoinModal';

const CoinTable: FC = () => {
  const navigate = useNavigate();
  const { coins, userCoins } = useCoin();

  const [selectedCoin, setSelectedCoin] = useState<ICoin | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const coinsRows: ICeil[] = useMemo(() => {
    return coins.map(({ id, ...coin }) => {
      const existCoin: IUserCoin | undefined = userCoins?.find(
        (el) => el.id === id
      );

      return {
        id,
        data: [
          { text: coin.name },
          { text: StringHelper.getCurrency(coin.priceUsd) },
          { text: coin.rank },
          { text: StringHelper.getCurrency(coin.marketCapUsd) },
          {
            text: existCoin ? 'Sell' : 'Add',
            onClick: () => {
              setSelectedCoin({ id, ...coin });
              existCoin ? setIsDeleteModalOpen(true) : setIsAddModalOpen(true);
            },
          },
          { text: existCoin ? existCoin.count : 0 },
        ],
      };
    });
  }, [coins, userCoins]);

  const coinsHead: string[] = useMemo(
    () => ['Name', 'Price', 'Rank', 'Market cap', 'Action', 'You have'],
    [coins]
  );

  const onOpenCeil = (ceil: ICeil) => {
    navigate(routeNames.Coin + ceil.id);
  };

  const onCloseModal = () => {
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedCoin(null);
  };

  return (
    <div className='container'>
      <AddCoinModal
        isVisible={isAddModalOpen}
        setIsVisible={setIsAddModalOpen}
        selectedCoin={selectedCoin}
        onClose={onCloseModal}
      />
      <SellCoinModal
        isVisible={isDeleteModalOpen}
        setIsVisible={setIsDeleteModalOpen}
        selectedCoin={selectedCoin}
        onClose={onCloseModal}
      />
      <Table rows={coinsRows} head={coinsHead} onCeilClick={onOpenCeil} />
    </div>
  );
};

export default memo(CoinTable);
