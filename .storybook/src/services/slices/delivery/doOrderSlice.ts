import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

type TInitialState = {
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  lastOrderName: string;
  orderAccept: boolean;
  isLoading: boolean;
};

const initialState: TInitialState = {
  orderRequest: false,
  isLoading: false,
  error: null,
  orderModalData: null,
  lastOrderName: '',
  orderAccept: false
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

const doOrderSlice = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {
    handleCloseOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderConfirmation: (state) => state.orderAccept,
    selectOrderError: (state) => state.error,
    selectIsOrderLoading: (state) => state.isLoading,
    getOrderModalInfo: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder

      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось сделать заказ';
      })
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.orderAccept = false;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderAccept = true;
        state.orderModalData = action.payload.order;
        state.isLoading = false;
        state.orderRequest = false;

        state.lastOrderName = action.payload.name;
        state.error = null;
      });
  }
});

export const {
  selectOrderError,
  getOrderConfirmation,
  getOrderModalInfo,
  getOrderRequest,
  selectIsOrderLoading
} = doOrderSlice.selectors;

export const { handleCloseOrderModal } = doOrderSlice.actions;

export const orderReducer = doOrderSlice.reducer;
