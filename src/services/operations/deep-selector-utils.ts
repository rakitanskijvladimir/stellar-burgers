import { RootState } from "../global-vault";
import { TIngredient } from "../../utils/data-blueprint";

export const ingredientsListSelector = (store: RootState) =>
  store.ingredientsList.ingredients;
export const burgerConstructorSelector = (store: RootState) =>
  store.burgerConstructor;
export const orderSelector = (store: RootState) => store.order;
export const orderInfoSelector = (store: RootState) => store.orderInfo.info;
export const isAuthCheckedSelector = (store: RootState) =>
  store.auth.isAuthChecked;
export const userSelector = (store: RootState) => store.auth.user;
export const ordersSelector = (store: RootState) => store.wsOrders.orders;
export const userOrdersSelector = (store: RootState) => store.wsUserOrders.orders;
export const totalSelector = (store: RootState) => store.wsOrders.total;
export const totalTodaySelector = (store: RootState) => store.wsOrders.totalToday;

export const orderTotalSelector = (store: RootState) =>
  (store.burgerConstructor.bun !== null
    ? store.burgerConstructor.bun.price * 2
    : 0) +
  store.burgerConstructor.filling.reduce(
    (sum: number, ingredient: TIngredient) => sum + ingredient.price,
    0
  );
