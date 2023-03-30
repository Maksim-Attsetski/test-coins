import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LSKeys, Storage } from 'shared';
import { defaultLastProfile, ICoin, ILastProfile } from './types';

interface IState {
  coins: ICoin[];
  userCoins: string[];
  lastProfile: ILastProfile;
  maxCoinsLength: number;
}

const initialState: IState = {
  coins: [],
  userCoins: Storage.getItem(LSKeys.userCoins),
  lastProfile: Storage.getItem(LSKeys.profile) ?? defaultLastProfile,
  maxCoinsLength: 10,
};

const setCoins = (state: IState, coins: string[]) => {
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
      state.lastProfile = action.payload;
      Storage.setItem(LSKeys.profile, action.payload);
    },
    setUserCoinsAC: (state: IState, action: PayloadAction<string[]>) => {
      setCoins(state, action.payload);
    },
    addUserCoinsAC: (state: IState, action: PayloadAction<string>) => {
      setCoins(
        state,
        state.userCoins
          ? [...state.userCoins, action.payload]
          : [action.payload]
      );
    },
    deleteUserCoinsAC: (state: IState, action: PayloadAction<string>) => {
      setCoins(
        state,
        state.userCoins
          ? state.userCoins.filter((el) => el !== action.payload)
          : []
      );
    },
  },
});

export const { actions: coinActions, reducer: coinReducer } = coinSlice;
