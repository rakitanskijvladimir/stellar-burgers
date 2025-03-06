import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients-orchestrator";
import burgerConstructorReducer from "./reducers/builder-tool-slice";
import orderReducer from "./reducers/order-overlord-slice";
import orderInfoReducer from "./reducers/order-inspector-slice";
import authReducer from "./reducers/auth-power-slice";
import wsReducer, {
  wsClose,
  wsError,
  wsOpen,
  wsRequest,
} from "./reducers/socket-whisperer-slice";
import wsUserReducer, {
  wsUserClose,
  wsUserError,
  wsUserOpen,
  wsUserRequest,
} from "./reducers/mystery-ws-user-slice";
import { wsMiddleware } from "./middlewares/watchdog-socket-handler";
import { wsEnd, wsStart } from "./operations/game-master-handlers";

const wsOrdersAction = {
  wsStart,
  wsEnd,
  wsOpen,
  wsClose,
  wsError,
  wsRequest,
};

const wsUserOrdersAction = {
  wsStart,
  wsEnd,
  wsOpen: wsUserOpen,
  wsClose: wsUserClose,
  wsError: wsUserError,
  wsRequest: wsUserRequest,
};

const ordersMiddleware = wsMiddleware(wsOrdersAction);
const userOrdersMiddleware = wsMiddleware(wsUserOrdersAction);

export const store = configureStore({
  reducer: {
    ingredientsList: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    orderInfo: orderInfoReducer,
    auth: authReducer,
    wsOrders: wsReducer,
    wsUserOrders: wsUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersMiddleware, userOrdersMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
