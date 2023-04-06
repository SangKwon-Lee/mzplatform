import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | undefined;
  userId: string | undefined;
}

const initialState: UserState = {
  token: undefined,
  userId: undefined,
};

// @todo: typescript 적용
const user = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    // Action creator
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = undefined;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setToken, clearToken, setUserId } = user.actions;
export default user;
