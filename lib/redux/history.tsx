import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const storeSearchedTerm = createAsyncThunk('/search/addHistory', async (term: string, thunkAPI) => {
  return term;
});

export const removeSearchedTerm = createAsyncThunk('/search/removeHistory', async (index: number, thunkAPI) => {
  return index;
});

interface HistoryState {
  history: string[];
}

const initialState: HistoryState = {
  history: [],
};

const history = createSlice({
  name: 'historyReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storeSearchedTerm.fulfilled, (state, action: PayloadAction<string>) => {
        state.history.push(action.payload);
      })
      .addCase(removeSearchedTerm.fulfilled, (state, action: PayloadAction<number>) => {
        state.history.splice(action.payload, 1);
      });
  },
});

export default history;
