import { ILoadingType, IIndexPrice } from './../../commons/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiServer } from '../api';

export const fetchKospiPrice = createAsyncThunk(`/index/kospi/fetchToday`, async (props, { rejectWithValue }) => {
  try {
    const { data, status } = await apiServer.get(`/price/today/index/kospi`);
    if (status === 200) {
      return data;
    } else {
      return rejectWithValue({});
    }
  } catch (e) {
    return rejectWithValue({});
  }
});

export const fetchKosdaqPrice = createAsyncThunk(`/index/kosdaq/fetchToday`, async (props, { rejectWithValue }) => {
  try {
    const { data, status } = await apiServer.get(`/price/today/index/kosdaq`);
    if (status === 200) {
      return data;
    } else {
      return rejectWithValue({});
    }
  } catch (e) {
    return rejectWithValue({});
  }
});

interface IndexState {
  kospiPrice: IIndexPrice;
  kospiLoading: ILoadingType;
  kosdaqPrice: IIndexPrice;
  kosdaqLoading: ILoadingType;
}

const initialState: IndexState = {
  kospiPrice: {
    price: 0,
    ratio: 0,
    open: 0,
    diff: 0,
    high: 0,
    low: 0,
    last: 0,
    volume: 0,
    value: 0,
    date: '',
    netPurchaseQuantityIndividual: 0,
    netPurchaseQuantityCompany: 0,
    netPurchaseQuantityForeigner: 0,
    netPurchasePriceIndividual: 0,
    netPurchasePriceCompany: 0,
    netPurchasePriceForeigner: 0,
  },
  kosdaqPrice: {
    price: 0,
    ratio: 0,
    open: 0,
    diff: 0,
    high: 0,
    low: 0,
    last: 0,
    volume: 0,
    value: 0,
    date: '',
    netPurchaseQuantityIndividual: 0,
    netPurchaseQuantityCompany: 0,
    netPurchaseQuantityForeigner: 0,
    netPurchasePriceIndividual: 0,
    netPurchasePriceCompany: 0,
    netPurchasePriceForeigner: 0,
  },
  kospiLoading: 'idle',
  kosdaqLoading: 'idle',
};

const indices = createSlice({
  name: 'indexReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKospiPrice.fulfilled, (state, action: PayloadAction<IIndexPrice>) => {
        state.kospiPrice = action.payload;
        state.kospiLoading = 'succeeded';
      })
      .addCase(fetchKosdaqPrice.fulfilled, (state, action: PayloadAction<IIndexPrice>) => {
        state.kosdaqPrice = action.payload;
        state.kosdaqLoading = 'succeeded';
      });
  },
});

export default indices;
