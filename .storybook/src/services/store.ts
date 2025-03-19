import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  ingredientsReducer,
  userReducer,
  ordersReducer,
  burgerConstructorReducer,
  orderReducer,
  feedsReducer,
  orderInfoReducer
} from '@slices';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,

  feeds: feedsReducer,
  orders: ordersReducer,

  user: userReducer,
  order: orderReducer,
  orderInfo: orderInfoReducer,
  burgerConstructor: burgerConstructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch: () => AppDispatch = () => dispatchHook();

export default store;
