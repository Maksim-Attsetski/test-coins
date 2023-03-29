import { useActions, useTypedSelector } from 'hooks';
import { useCallback, useEffect } from 'react';
import { dateHelper, IQuery } from 'shared';
import { CoinService, defaultLastProfile, ICoin, ILastProfile } from '.';

const useCoin = (query?: IQuery) => {
  const { coins, userCoins, lastProfile } = useTypedSelector(
    (state) => state.coin
  );
  const { action } = useActions();

  const onGetCoins = useCallback(async (query?: IQuery, isReturn?: boolean) => {
    const data = await CoinService.getCoins(query);

    if (isReturn) {
      return data?.data;
    }

    action.setCoinsAC(data?.data);
  }, []);

  const onGetOneCoin = useCallback(async (id: string) => {
    const data = await CoinService.getOneCoin(id);

    return data?.data;
  }, []);

  const onAddUserCoin = useCallback((id: string) => {
    action.addUserCoinsAC(id);
  }, []);

  const onDeleteUserCoin = useCallback((id: string) => {
    action.deleteUserCoinsAC(id);
  }, []);

  const onCalcChanges = useCallback(async () => {
    if (!userCoins) return;

    const data: ICoin[] = await onGetCoins({ ids: userCoins.join(',') }, true);

    if (
      lastProfile.lastUpdate === 0 ||
      lastProfile.lastUpdate < Date.now() ||
      lastProfile.coinCount !== userCoins.length
    ) {
      if (userCoins.length === 0) {
        action.setProfileAC(defaultLastProfile);
        return defaultLastProfile;
      }

      const currentChanges = data.reduce(
        (prev, cur: ICoin) =>
          ({
            price: (prev.price += +cur.vwap24Hr - +cur.priceUsd),
            percent: (prev.percent += +cur.changePercent24Hr),
            lastUpdate: dateHelper.dates.after1d,
            coinCount: userCoins.length,
          } as ILastProfile),
        { coinCount: 0, lastUpdate: 0, percent: 0, price: 0 }
      );

      action.setProfileAC(currentChanges);
      return currentChanges;
    } else {
      return lastProfile;
    }
  }, [userCoins, lastProfile]);

  useEffect(() => {
    query && onGetCoins(query);
  }, [query?.limit, query?.offset]);

  return {
    coins,
    userCoins,
    lastProfile,
    onGetOneCoin,
    onGetCoins,
    onAddUserCoin,
    onDeleteUserCoin,
    onCalcChanges,
  };
};
export default useCoin;
