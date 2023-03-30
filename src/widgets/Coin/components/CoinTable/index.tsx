import React, { FC, memo, useMemo, useState } from 'react';

import { routeNames } from 'navigation/types';
import { useNavigate } from 'react-router-dom';

import { StringHelper } from 'shared';
import { ICeil, Table } from 'UI';
import { useCoin, ICoin } from 'widgets/Coin';

import AddCoinModal from '../AddCoinModal';
import SellCoinModal from '../SellCoinModal';

interface IProps {
  limit: number;
  offset: number;
}

const CoinTable: FC<IProps> = ({ limit, offset }) => {
  const navigate = useNavigate();
  const { coins, userCoins } = useCoin({
    limit,
    offset: offset * limit,
  });

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
