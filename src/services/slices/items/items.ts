import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

import { getFeedsApi } from '@api';

type TInitialState = {
  error: string | null;
  feedData: TOrdersData | null;
  listItem: TOrder[];
  listItemInfo: {
    totalToday: number;
    total: number;
  };
  isLoading: boolean;
};

const initialState: TInitialState = {
  listItem: [],
  feedData: null,
  isLoading: false,
  error: null,
  listItemInfo: {
    total: 0,
    totalToday: 0
  }
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', getFeedsApi);

const itemsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    itemDataSelect: (state) => state.feedData,
    itemListSelect: (state) => state.listItemInfo,
    errorSelector: (state) => state.error,
    itemLoad: (state) => state.isLoading,
    listSelecors: (state) => state.listItem
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось загрузить лист заказов';
        state.isLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.listItem = action.payload.orders;
        state.listItemInfo.total = action.payload.total;
        state.isLoading = false;

        state.listItemInfo.totalToday = action.payload.totalToday;
        state.error = null;
      });
  }
});

export const {
  listSelecors,
  errorSelector,
  itemLoad,
  itemDataSelect,
  itemListSelect
} = itemsSlice.selectors;
export const feedsReducer = itemsSlice.reducer;
