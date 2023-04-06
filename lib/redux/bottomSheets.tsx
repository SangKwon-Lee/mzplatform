import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IStockPrice, INewsBottomSheet } from '../../commons/types';

interface BottomSheetState {
  news: INewsBottomSheet;
}

const initialState: BottomSheetState = {
  news: {
    openSheet: false,
    title: '',
    url: '',
    summary: '',
    photo: '',
    handleOpenSheet: undefined,
    publishDate: '',
    media: '',
  },
};

// @todo: typescript 적용
const bottomSheets = createSlice({
  name: 'bottomSheetReducer',
  initialState,
  reducers: {
    // Action creator
    setNewsBottomSheet: (state, action: PayloadAction<INewsBottomSheet>) => {
      state.news = action.payload;
    },
    closeNewsBottomSheet: (state) => {
      state.news = { ...state.news, openSheet: false };
    },
  },
});

export const { setNewsBottomSheet, closeNewsBottomSheet } = bottomSheets.actions;
export default bottomSheets;
