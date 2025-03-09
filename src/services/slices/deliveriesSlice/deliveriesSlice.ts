import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

type TInitialState = {
  isLoading: boolean;
  error: string | null;
  orders: TOrder[];
};
export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

const initialState: TInitialState = {
  isLoading: false,
  error: null,
  orders: []
};

const deliveriesSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersData: (state) => state.orders,
    selectOrdersLoadingStatus: (state) => state.isLoading,
    selectOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось загрузить заказы';
        state.isLoading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.error = null;
        state.orders = action.payload;
        state.isLoading = false;
      });
  }
});

export const {
  selectOrdersData,
  selectOrdersError,
  selectOrdersLoadingStatus
} = deliveriesSlice.selectors;
export const ordersReducer = deliveriesSlice.reducer;
