import { IStockKeyword, IKeywords } from './../../commons/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiServer } from '../api';

export const fetchStockKeyword = createAsyncThunk(`/search/fetchStockKeyword`, async (props, { rejectWithValue }) => {
  try {
    const response = await apiServer.get(`/search/stock/${props}`);
    return response.data;
  } catch (e) {
    return rejectWithValue('');
  }
});

export const fetchKeywords = createAsyncThunk(`/keywords/fetchKeywords`, async (props, { rejectWithValue }) => {
  try {
    const response = await apiServer.get(`/keywords/${props}`);
    return response.data;
  } catch (e) {
    return rejectWithValue('');
  }
});

interface KeywordState {
  stockKeyword: IStockKeyword;
  keywords: IKeywords;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: KeywordState = {
  stockKeyword: {
    count: 0,
    data: [],
  },
  keywords: {
    avgPrice: 0,
    avgRatio: 0,
    name: '',
    summary: '',
    description: '',
    stocks: [],
  },
  loading: 'idle',
};

const keyword = createSlice({
  name: 'keywordReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockKeyword.fulfilled, (state, action: PayloadAction<IStockKeyword>) => {
        state.stockKeyword = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchStockKeyword.rejected, (state, action) => {
        state.loading = 'failed';
        state.stockKeyword = { count: 0, data: [] };
      })
      .addCase(fetchKeywords.fulfilled, (state, action: PayloadAction<IKeywords>) => {
        state.keywords = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchKeywords.rejected, (state) => {
        state.loading = 'failed';
        state.keywords = {} as IKeywords;
      });
  },
});

export default keyword;
