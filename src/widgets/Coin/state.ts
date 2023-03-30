import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LSKeys, Storage } from 'shared';
import { defaultLastProfile, ICoin, ILastProfile, IUserCoin } from './types';

interface IState {
  coins: ICoin[];
  userCoins: IUserCoin[];
  coinsBag: ILastProfile;
  maxCoinsLength: number;
}

const initialState: IState = {
  coins: [],
  userCoins: Storage.getItem(LSKeys.userCoins),
  coinsBag: Storage.getItem(LSKeys.profile) ?? defaultLastProfile,
  maxCoinsLength: 10,
};

const setCoins = (state: IState, coins: IUserCoin[]) => {
  state.userCoins = coins;
  Storage.setItem(LSKeys.userCoins, coins);
};

const coinSlice = createSlice({
  name: 'coinSlice',
  initialState,
  reducers: {
    setCoinsAC: (state: IState, action: PayloadAction<ICoin[]>) => {
      state.coins = action.payload;
    },
    setMaxCoinsLengthAC: (state: IState, action: PayloadAction<number>) => {
      state.maxCoinsLength = action.payload;
    },
    setProfileAC: (state: IState, action: PayloadAction<ILastProfile>) => {
      state.coinsBag = action.payload;
      Storage.setItem(LSKeys.profile, action.payload);
    },
    setUserCoinsAC: (state: IState, action: PayloadAction<IUserCoin[]>) => {
      setCoins(state, action.payload);
    },
    addUserCoinsAC: (state: IState, action: PayloadAction<IUserCoin>) => {
      setCoins(
        state,
        state.userCoins
          ? [...state.userCoins, action.payload]
          : [action.payload]
      );
    },
    editUserCoinsAC: (state: IState, action: PayloadAction<IUserCoin>) => {
      setCoins(
        state,
        state.userCoins.map((coin) =>
          coin.id === action.payload.id ? action.payload : coin
        )
      );
    },
    deleteUserCoinsAC: (state: IState, action: PayloadAction<string>) => {
      setCoins(
        state,
        state.userCoins
          ? state.userCoins.filter((el) => el.id !== action.payload)
          : []
      );
    },
  },
});

export const { actions: coinActions, reducer: coinReducer } = coinSlice;
