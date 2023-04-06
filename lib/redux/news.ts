import { IKeywordNews, IStockNews, ISimilarNews } from './../../commons/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiServer } from '../api';
import type { INews } from '../../commons/types';

export const fetchStockNews = createAsyncThunk(`/stock/fetchStockNews`, async (props, { rejectWithValue }) => {
  try {
    const response = await apiServer.get(`/stock/${props}/news?limit=3`);
    return response.data;
  } catch (e) {
    return rejectWithValue('');
  }
});

export const fetchKeywordNews = createAsyncThunk(`/news/fetchKeywordNews`, async (props, { rejectWithValue }) => {
  try {
    const response = await apiServer.get(`/news/${props}?_sort=publishDate:DESC&_limit=30`);
    return response.data;
  } catch (e) {
    return rejectWithValue('');
  }
});

export interface SimilarNewsByKey {
  [index: number]: ISimilarNews[];
}

interface NewsState {
  news: INews[];
  similarNews: SimilarNewsByKey;
  stocknews: IStockNews[];
  keywordNews: IKeywordNews[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

//* For reference purpose
// export const fetchTodaySchedules = createAsyncThunk('/schedules/fetchToday', async (thunkAPI) => {
//   const response = await apiServer.get('/schedules');
//   return response.data;
// });

// export const fetchMonthlySchedules = createAsyncThunk('/schedules/fetchMonthly', async (thunkAPI) => {
//   const startDate = dayjs().startOf('month').format('YYYYMMDD');
//   const endDate = dayjs().endOf('month').format('YYYYMMDD');
//   const response = await apiServer.get(`/schedules?_sort=startDate:desc&_startDate=${startDate}&_endDate=${endDate}&_limit=${200}`);
//   return response.data;
// });

export const fetchNews = createAsyncThunk('/news/fetch', async (thunkAPI) => {
  const response = await apiServer.get(`/news?_sort=publishDate:desc&source=flash&_limit=${10}`);
  return response.data;
});

const initialState: NewsState = {
  news: [],
  similarNews: {},
  stocknews: [],
  keywordNews: [],
  loading: 'idle',
};

// @todo: typescript 적용

const news = createSlice({
  name: 'newsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<INews[]>) => {
        state.news = action.payload;
        action.payload.map((news) => {
          if (news.similarNewsList && Array.isArray(news.similarNewsList) && news.similarNewsList.length > 0) {
            state.similarNews[news.id] = news.similarNewsList;
          }
        });
        state.loading = 'succeeded';
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = 'failed';
        state.news = [];
      })
      .addCase(fetchStockNews.fulfilled, (state, action: PayloadAction<IStockNews[]>) => {
        state.stocknews = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchStockNews.rejected, (state, action) => {
        state.loading = 'failed';
        state.stocknews = [];
      })
      .addCase(fetchKeywordNews.fulfilled, (state, action: PayloadAction<IKeywordNews[]>) => {
        state.keywordNews = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchKeywordNews.rejected, (state, action) => {
        state.loading = 'failed';
        state.keywordNews = [];
      });
  },
});

//export const { fetchTodaySchedules } = schedules.actions;

export default news;
