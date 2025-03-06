import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WebSocketState = {
    wsConnected: boolean;
    orders: any[];
    total: number | null;
    totalToday: number | null;
    error?: string;
};

const initialState: WebSocketState = {
    wsConnected: false,
    orders: [],
    total: null,
    totalToday: null,
    error: undefined,
};

const websocketSlice = createSlice({
    name: "wsOrders",
    initialState,
    reducers: {
        wsOpen: (state) => {
            state.wsConnected = true;
            state.error = undefined;
        },
        wsClose: () => initialState,
        wsError: (state, action: PayloadAction<string>) => {
            state.wsConnected = false;
            state.error = action.payload;
        },
        wsRequest: (state, action: PayloadAction<{ orders: any[], total: number, totalToday: number }>) => {
            state.wsConnected = true;
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.error = undefined;
        },
    }
});

export const { wsOpen, wsClose, wsError, wsRequest } = websocketSlice.actions;
export default websocketSlice.reducer;
