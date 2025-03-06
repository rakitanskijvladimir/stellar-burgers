import { createSlice } from "@reduxjs/toolkit";
import { TFullOrder } from "../../utils/data-blueprint";

type TInitialState = {
  wsConnected: boolean;
  orders: TFullOrder[];
  error?: Event;
};

export const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
};

const wsUserSlice = createSlice({
  name: "wsUserOrders",
  initialState,
  reducers: {
    wsUserRequest: (state, action) => {
      state.wsConnected = true;
      state.orders = action.payload.orders; // Здесь заказы должны попадать в `orders`
      state.error = undefined;
    },
    wsUserError: (state, action) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsUserClose: () => initialState,
    wsUserOpen: (state) => {
      state.wsConnected = true;
      state.error = undefined;
    },
  },
});
export default wsUserSlice.reducer;
export const { wsUserOpen, wsUserClose, wsUserError, wsUserRequest } =
  wsUserSlice.actions;
