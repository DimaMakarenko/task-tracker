import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [];

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    clearTagsAction: () => {
      return [];
    },
    fetchTagsAction: (state, { payload }) => {
      return [...new Set([...state, ...payload])];
    },
  },
});

const { reducer, actions } = tagsSlice;

export const { clearTagsAction, fetchTagsAction } = actions;

export default reducer;
