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

export interface ILastProfile {
  price: number;
  percent: number;
  coinCount: number;
  lastUpdate: number;
}

export const defaultLastProfile: ILastProfile = {
  percent: 0,
  price: 0,
  lastUpdate: dateHelper.dates.after1d,
  coinCount: 0,
};

export interface ICoinApiRes {
  data: ICoin[];
  max?: number | undefined;
}
