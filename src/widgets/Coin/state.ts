import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoin } from './types';

interface IState {
  coins: ICoin[];
}

const initialState: IState = {
  coins: [],
};

const setCoins = (state: IState, coins: ICoin[]) => {
  state.coins = coins;
  localStorage.setItem('user-coins', JSON.stringify(coins));
};

const coinSlice = createSlice({
  name: 'coinSlice',
  initialState,
  reducers: {
    setCoinsAC: (state: IState, action: PayloadAction<ICoin[]>) => {
      setCoins(state, action.payload);
    },
  },
});

export const { actions: coinActions, reducer: coinReducer } = coinSlice;
