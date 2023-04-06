import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ILoadingType, ISchedule } from '../../commons/types';
import { apiServer } from '../api';
import moment from 'moment';
import dayjs from 'dayjs';

export const fetchTodaySchedules = createAsyncThunk('/schedules/fetchToday', async (thunkAPI) => {
  const response = await apiServer.get('/schedules');
  return response.data;
});

export const fetchWeeklySchedules = createAsyncThunk('/schedules/fetchWeekly', async (thunkAPI) => {
  const today = moment().format('YYYYMMDD');
  const endDate = moment().add(7, 'days').format('YYYYMMDD');
  const response = await apiServer.get(`/schedules?_startDate=${today}&_endDate=${endDate}&_limit=${100}`);
  return response.data;
});

export const fetchMonthlySchedules = createAsyncThunk('/schedules/fetchMonthly', async (date: string, thunkAPI) => {
  const startDate = dayjs(date).startOf('month').format('YYYYMMDD');
  const endDate = dayjs(date).endOf('month').format('YYYYMMDD');
  const response = await apiServer.get(`/schedules?_sort=startDate:desc&_startDate=${startDate}&_endDate=${endDate}&_limit=${200}`);
  return response.data;
});

export interface SchedulesByMonth {
  [index: string]: ISchedule[];
}

interface ScheduleState {
  schedules: ISchedule[];
  multipleSchedules: SchedulesByMonth;
  loading: ILoadingType;
}

const initialState: ScheduleState = {
  schedules: [],
  multipleSchedules: {},
  loading: 'idle',
};

// @todo: typescript 적용
const schedules = createSlice({
  name: 'scheduleReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodaySchedules.fulfilled, (state, action: PayloadAction<ISchedule[]>) => {
        state.schedules = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchMonthlySchedules.fulfilled, (state, action: PayloadAction<ISchedule[]>) => {
        state.schedules = action.payload;
        if (action.payload[0]) state.multipleSchedules[dayjs(action.payload[0].startDate).format('YYYY.MM')] = action.payload;
        state.loading = 'succeeded';
      });
  },
});

//export const { fetchTodaySchedules } = schedules.actions;
export default schedules;
