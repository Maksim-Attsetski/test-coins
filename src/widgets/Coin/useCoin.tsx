import { useCallback, useEffect, useState } from 'react';

import { useActions, useTypedSelector } from 'hooks';
import { dateHelper, IQuery, TIntervalsText } from 'shared';
import { CoinService, ICoinApiRes, IUserCoin } from '.';

const useCoin = (query?: IQuery) => {
  const { coins, userCoins, coinsBag, maxCoinsLength } = useTypedSelector(
    (state) => state.coin
  );
  const { action } = useActions();
  const [isLoading, setIsLoading] = useState(!!query);

  const onGetCoins = useCallback(
    async (query?: IQuery, isReturn?: boolean): Promise<ICoinApiRes> => {
      try {
        setIsLoading(true);
        const data = await CoinService.getCoins(query);

        !isReturn && action.setCoinsAC(data.data);
        data.max && action.setMaxCoinsLengthAC(data.max);

        return data;
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const onGetOneCoin = useCallback(async (id: string) => {
    const data = await CoinService.getOneCoin(id);

    return data?.data;
  }, []);

  const onAddUserCoin = useCallback((data: IUserCoin) => {
    action.addUserCoinsAC(data);
  }, []);

  const onEditUserCoin = useCallback((data: IUserCoin) => {
    action.editUserCoinsAC(data);
  }, []);

  const onDeleteUserCoin = useCallback((id: string) => {
    action.deleteUserCoinsAC(id);
  }, []);

  const onGetHistory = useCallback(async (id: string, type: TIntervalsText) => {
    const query: IQuery = {
      start: dateHelper.getInterval(type),
      end: Date.now(),
      interval: type === 'month' ? 'd1' : 'h1',
    };

    const response = await CoinService.getOneCoinHistory(id, query);

    return response;
  }, []);

  const onCalcChanges = async () => {
    if (!userCoins) return;

    const data = await onGetCoins(
      { ids: userCoins.map((el) => el.id).join(',') },
      true
    );
    const currentChanges = { ...coinsBag };

    if (userCoins.length === 0) {
      action.setProfileAC(currentChanges);
      return currentChanges;
    }

    const coinsBagCost = data.data.reduce((prev, cur) => {
      const curCoin = userCoins.find((el) => el.id === cur.id);
      return curCoin ? (prev += cur.priceUsd * curCoin.count) : prev;
    }, 0);

    const changeInUSD =
      coinsBagCost + coinsBag.balance - coinsBag.balance1dbefore;
    const changeInPercent =
      changeInUSD >= 1 ? changeInUSD / 100 : changeInUSD / -100;

    currentChanges.changeInPercent = changeInPercent;
    currentChanges.balanceInCoins = coinsBagCost;
    currentChanges.changeInUSD = changeInUSD;
    currentChanges.coinCount = userCoins.length;

    if (coinsBag.lastUpdate < Date.now()) {
      currentChanges.balance1dbefore = coinsBagCost + coinsBag.balance;
      currentChanges.lastUpdate = Date.now();
    }

    action.setProfileAC(currentChanges);
    return currentChanges;
  };

  useEffect(() => {
    query && onGetCoins(query);
  }, [query?.limit, query?.offset]);

  return {
    coins,
    userCoins,
    coinsBag,
    maxCoinsLength,
    isLoading,
    onGetOneCoin,
    onGetCoins,
    onAddUserCoin,
    onEditUserCoin,
    onDeleteUserCoin,
    onGetHistory,
    onCalcChanges,
  };
};
export default useCoin;
