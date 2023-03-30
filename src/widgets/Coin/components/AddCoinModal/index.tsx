import React, { Dispatch, FC, memo, SetStateAction, useState } from 'react';

import { useActions } from 'hooks';
import { InputModal } from 'UI';
import { ICoin, useCoin } from 'widgets/Coin';

interface IProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedCoin: ICoin | null;
  onClose: () => void;
}

const AddCoinModal: FC<IProps> = ({ selectedCoin, onClose, ...props }) => {
  const { coinsBag, onAddUserCoin } = useCoin();
  const { action } = useActions();
  const [error, setError] = useState('');

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

      onClose();
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <div>
      <InputModal
        inputType='number'
        error={error}
        setError={setError}
        title='How much coins do you wanna buy?'
        text={`Your balance: ${coinsBag.balance}, price for 1 coin: ${selectedCoin?.priceUsd}`}
        onConfirm={onBuyCoins}
        {...props}
      />
    </div>
  );
};
export default memo(AddCoinModal);
