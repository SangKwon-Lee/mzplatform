import { ILoadingType, IPriceList, MZMost } from './../../commons/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiServer } from '../api';
import dayjs from 'dayjs';

interface Props {
  gbn: string;
  limit: number;
}

export const fetchPriceList = createAsyncThunk(`/price/list`, async (props: Props, { rejectWithValue }) => {
  try {
    const response = await apiServer.get(`/price/list?tp=all&gbn=${props.gbn}&cnt=${props.limit}`);
    return response.data;
  } catch (e) {
    return rejectWithValue('');
  }
});

export const fetchPriceMZMost = createAsyncThunk(`/price/list/MZMost`, async (props: Props, { rejectWithValue }) => {
  try {
    const { data, status } = await apiServer.get(`/analytics/mzHotStocks`);
    if (status === 200) {
      return data;
    }
  } catch (e) {
    return [];
    return rejectWithValue('');
  }
});

export const fetchPriceLMZRanking = createAsyncThunk(`/price/list/MZRanking`, async (props: Props, { rejectWithValue }) => {
  try {
    const response = await Promise.all([
      apiServer.get(`/price/list?tp=all&gbn=trade&cnt=3`),
      apiServer.get(`/price/list?tp=all&gbn=cap&cnt=2`),
      apiServer.get(`/price/list?tp=all&gbn=inc&cnt=3`),
      apiServer.get(`/price/list?tp=all&gbn=dec&cnt=2`),
    ]);
    // const response = await apiServer.get(`/price/list?tp=all&gbn=${props.gbn}&cnt=${props.limit}`);
    return [];
  } catch (e) {
    return rejectWithValue('');
  }
});

export const fetchPriceKospiRanking = createAsyncThunk(`/price/list/kospiRanking`, async (props: Props, { rejectWithValue }) => {
  try {
    const { data, status } = await apiServer.get(`/price/ranking/index/kospi`);
    if (status === 200) {
      return data;
    } else {
      return rejectWithValue('');
    }
  } catch (e) {
    return rejectWithValue('');
  }
});

export const fetchPriceKosdaqRanking = createAsyncThunk(`/price/list/kosdaqRanking`, async (props: Props, { rejectWithValue }) => {
  try {
    const { data, status } = await apiServer.get(`/price/ranking/index/kosdaq`);
    if (status === 200) {
      return data;
    } else {
      return rejectWithValue('');
    }
  } catch (e) {
    return rejectWithValue('');
  }
});

interface PriceListState {
  priceList: IPriceList[];
  priceListMZMost: MZMost;
  priceListMZRanking: IPriceList[];
  priceListKospi: IPriceList[];
  kospiListLoading: ILoadingType;
  priceListKosdaq: IPriceList[];
  kosdaqListLoading: ILoadingType;
  loading: ILoadingType;
}

const initialState: PriceListState = {
  priceList: [],
  priceListMZMost: {
    fromDate: '',
    count: 0,
    stocks: [],
  },
  priceListMZRanking: [],
  priceListKospi: [],
  priceListKosdaq: [],
  kospiListLoading: 'idle',
  kosdaqListLoading: 'idle',
  loading: 'idle',
};

const priceList = createSlice({
  name: 'keywordReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceList.fulfilled, (state, action: PayloadAction<IPriceList[]>) => {
        state.priceList = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchPriceList.rejected, (state, action) => {
        state.loading = 'failed';
        state.priceList = [];
      })
      .addCase(fetchPriceMZMost.fulfilled, (state, action: PayloadAction<MZMost>) => {
        state.priceListMZMost = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchPriceMZMost.rejected, (state, action) => {
        state.loading = 'failed';
        state.priceListMZMost = {
          fromDate: '',
          count: 0,
          stocks: [],
        };
      })
      .addCase(fetchPriceLMZRanking.fulfilled, (state, action: PayloadAction<IPriceList[]>) => {
        state.priceListMZRanking = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchPriceLMZRanking.rejected, (state, action) => {
        state.loading = 'failed';
        state.priceListMZRanking = [];
      })
      .addCase(fetchPriceKospiRanking.fulfilled, (state, action: PayloadAction<IPriceList[]>) => {
        state.kospiListLoading = 'succeeded';
        state.priceListKospi = action.payload;
      })
      .addCase(fetchPriceKosdaqRanking.fulfilled, (state, action: PayloadAction<IPriceList[]>) => {
        state.kosdaqListLoading = 'succeeded';
        state.priceListKosdaq = action.payload;
      });
  },
});

export default priceList;
