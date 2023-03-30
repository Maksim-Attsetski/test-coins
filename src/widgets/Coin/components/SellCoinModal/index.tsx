import React, {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

import { useActions } from 'hooks';
import { InputModal } from 'UI';
import { ICoin, useCoin } from 'widgets/Coin';

interface IProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedCoin: ICoin | null;
  onClose: () => void;
}

const SellCoinModal: FC<IProps> = ({ selectedCoin, onClose, ...props }) => {
  const { coinsBag, userCoins, onDeleteUserCoin, onEditUserCoin } = useCoin();
  const { action } = useActions();
  const [error, setError] = useState('');

  const currentUserCoin = useMemo(
    () =>
      selectedCoin ? userCoins?.find((el) => el.id === selectedCoin.id) : null,
    [selectedCoin, userCoins]
  );

  const onSellCoins = (count: string) => {
    if (!currentUserCoin?.id || !selectedCoin?.id) return;

    try {
      if (+count > currentUserCoin.count) {
        throw new Error('У вас столько нет...');
      }

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

      onClose();
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <InputModal
      error={error}
      setError={setError}
      inputType='number'
      title={'How much coins do you wanna sell?'}
      text={`Your balance: ${coinsBag.balance}, you have ${
        currentUserCoin?.count || 0
      } coins`}
      onConfirm={onSellCoins}
      {...props}
    />
  );
};
export default memo(SellCoinModal);
