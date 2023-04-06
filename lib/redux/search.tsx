import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ILoadingType, INews, ISearchAuto, ISearchKeywordResult, ISearch, IHotStock, IHistory, IHotStockResult } from '../../commons/types';
import { apiServer } from '../api';
import keyword from './keyword';
import { stackOffsetExpand } from 'd3';

export const fetchSearchAuto = createAsyncThunk('/search/autoComplete/keyword=0', async (input: string, thunkAPI) => {
  const response = await apiServer.get(`/search/autoComplete/${input}?keyword=0`);
  return response.data;
});

export const fetchSearch = createAsyncThunk('/search/autoComplete', async (input: string, thunkAPI) => {
  const response = await apiServer.get(`/search/autoComplete/${input}`);
  return response.data;
});

export const fetchSearchKeyword = createAsyncThunk('/search/stock/keyword', async (keyword: string, thunkAPI) => {
  const response = await apiServer.get(`/search/stock/${keyword}`);
  return response.data;
});

export const fetchNewsByKeyword = createAsyncThunk('/search/fetchNewsbyKeyword', async (keyword: string, thunkAPI) => {
  const response = await apiServer.get(`/news/${keyword}`);
  return response.data;
});

export const storeSearchedTerm = createAsyncThunk('/search/addHistory', async (term: string, thunkAPI) => {
  return term;
});

export const removeSearchedTerm = createAsyncThunk('/search/removeHistory', async (index: number, thunkAPI) => {
  return index;
});

export const createSearchKeywordAnalytic = createAsyncThunk('/search/createSearchKeywordAnalytic', async (body: object, thunkAPI) => {
  const response = await apiServer.post(`/analytics/searchKeyword/`, body);
  console.log('createSearchKeywordAnalytic', body, response);
  return response.status;
});

export const fetchHotStock = createAsyncThunk('/search/fetchHotStocks', async (thunkAPI) => {
  const response = await apiServer.get('/analytics/mzHotStocks');
  return response.data;
});

interface SearchState {
  autocomplete: ISearchAuto[];
  response: ISearch[];
  news: INews[];
  newsLoading: ILoadingType;
  hotStocks: IHotStockResult;
  loading: ILoadingType;
  screenLoading: boolean;
}

const initialState: SearchState = {
  autocomplete: [],
  response: [],
  news: [],
  newsLoading: 'idle',
  hotStocks: { fromDate: '', count: 0, stocks: [] },
  loading: 'idle',
  screenLoading: false,
};

// @todo: typescript 적용
const search = createSlice({
  name: 'searchReducer',
  initialState,
  reducers: {
    cleanResponse: (state) => {
      state.response = [];
    },
    cleanNews: (state) => {
      state.news = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.fulfilled, (state, action: PayloadAction<ISearch[]>) => {
        state.response = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = 'failed';
        state.response = [];
      })
      .addCase(fetchSearchAuto.fulfilled, (state, action: PayloadAction<ISearchAuto[]>) => {
        state.autocomplete = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchSearchAuto.rejected, (state, action) => {
        state.loading = 'failed';
        state.autocomplete = [];
      })
      .addCase(fetchNewsByKeyword.fulfilled, (state, action: PayloadAction<INews[]>) => {
        state.newsLoading = 'succeeded';
        state.news = action.payload;
      })
      .addCase(fetchHotStock.fulfilled, (state, action: PayloadAction<IHotStockResult>) => {
        state.hotStocks = action.payload;
        state.screenLoading = true;
        state.loading = 'succeeded';
      })
      .addCase(fetchHotStock.rejected, (state, action) => {
        state.hotStocks = { fromDate: '', count: 0, stocks: [] };
        state.screenLoading = true;
        state.loading = 'failed';
      });
  },
});

export const { cleanNews, cleanResponse } = search.actions;
export default search;
