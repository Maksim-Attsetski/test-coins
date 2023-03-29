import { useActions, useTypedSelector } from 'hooks';
import { useCallback, useEffect } from 'react';
import { IQuery } from 'shared';
import { CoinService } from '.';

const useCoin = (query?: IQuery) => {
  const { coins } = useTypedSelector((state) => state.coin);
  const { action } = useActions();

  const onGetCoins = useCallback(async (query?: IQuery) => {
    const data = await CoinService.getCoins(query);

    action.setCoinsAC(data?.data);
  }, []);

  useEffect(() => {
    query && onGetCoins(query);
  }, []);

  return { coins, onGetCoins };
};
export default useCoin;
