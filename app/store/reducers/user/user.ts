import { createSlice } from '@reduxjs/toolkit';
// types
import { IUser } from '../../type';

const initialState: IUser = {
  uid: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.uid = payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUser } = actions;

export default reducer;
