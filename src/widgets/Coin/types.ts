import { dateHelper } from 'shared';

export interface ICoin {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: number;
  maxSupply: number;
  marketCapUsd: number;
  volumeUsd24Hr: number;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: number;
}

export interface IUserCoin {
  id: string;
  count: number;
}

export interface ILastProfile {
  balance: number;
  balanceInCoins: number;
  changeInUSD: number;
  changeInPercent: number;
  coinCount: number;
  lastUpdate: number;
  balance1dbefore: number;
}

export const defaultLastProfile: ILastProfile = {
  balance: 100,
  balanceInCoins: 0,
  changeInUSD: 0,
  changeInPercent: 0,
  coinCount: 0,
  lastUpdate: dateHelper.dates.after1d,
  balance1dbefore: 100,
};

export interface ICoinApiRes {
  data: ICoin[];
  max?: number | undefined;
}

export interface ICoinHistory {
  priceUsd: number;
  time: number;
}
