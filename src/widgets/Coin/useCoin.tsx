import { useActions, useTypedSelector } from 'hooks';
import { useCallback, useEffect } from 'react';
import { IQuery } from 'shared';
import { CoinService } from '.';

const useCoin = (query?: IQuery) => {
  const { coins, userCoins } = useTypedSelector((state) => state.coin);
  const { action } = useActions();

  const onGetCoins = useCallback(async (query?: IQuery) => {
    const data = await CoinService.getCoins(query);

    action.setCoinsAC(data?.data);
  }, []);

  const onAddUserCoin = useCallback((id: string) => {
    action.addUserCoinsAC(id);
  }, []);

  const onDeleteUserCoin = useCallback((id: string) => {
    action.deleteUserCoinsAC(id);
  }, []);

  useEffect(() => {
    query && onGetCoins(query);
  }, [query?.limit, query?.offset]);

  return { coins, userCoins, onGetCoins, onAddUserCoin, onDeleteUserCoin };
};
export default useCoin;
