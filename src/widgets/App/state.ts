import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  isAppLoading: boolean;
}

const initialState: IState = {
  isAppLoading: true,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setIsAppLoadingAC: (state: IState, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { actions } = appSlice;
