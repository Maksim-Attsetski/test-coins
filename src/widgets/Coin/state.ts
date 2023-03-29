import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Storage } from 'shared';
import { ICoin } from './types';

interface IState {
  coins: ICoin[];
  userCoins: string[];
}
const LSKey = 'user-coins';

const initialState: IState = {
  coins: [],
  userCoins: Storage.getItem(LSKey),
};

const setCoins = (state: IState, coins: string[]) => {
  state.userCoins = coins;
  Storage.setItem(LSKey, coins);
};

const coinSlice = createSlice({
  name: 'coinSlice',
  initialState,
  reducers: {
    setCoinsAC: (state: IState, action: PayloadAction<ICoin[]>) => {
      state.coins = action.payload;
    },
    setUserCoinsAC: (state: IState, action: PayloadAction<string[]>) => {
      setCoins(state, action.payload);
    },
    addUserCoinsAC: (state: IState, action: PayloadAction<string>) => {
      setCoins(state, [...state.userCoins, action.payload]);
    },
    deleteUserCoinsAC: (state: IState, action: PayloadAction<string>) => {
      setCoins(
        state,
        state.userCoins.filter((el) => el !== action.payload)
      );
    },
  },
});

export const { actions: coinActions, reducer: coinReducer } = coinSlice;
