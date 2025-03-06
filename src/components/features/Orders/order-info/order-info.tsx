import React from "react";
import clsx from "clsx";

import styles from "./order-info.module.css";

import { TOrderInfo, useAppSelector } from "../../../../utils/data-blueprint";
import { ingredientsListSelector } from "../../../../services/operations/deep-selector-utils";
import {
  collectOrderIngredients,
  getStatus,
  totalPriceOrder,
} from "../../../../utils/magic-helper-functions";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

type TInfoOrderProps = {
  order: TOrderInfo;
};

export default function InfoOrder({ order }: TInfoOrderProps) {
  const ingredients = useAppSelector(ingredientsListSelector);

  const orderDate = new Date(order.createdAt);
  const timeZoneOffset = (orderDate.getTimezoneOffset() * -1) / 60;

  const uniqueOrderIngredients = collectOrderIngredients(
    order,
    ingredients
  ).filter(
    (ingredient, index, ingredientsArray) =>
      ingredientsArray.indexOf(ingredient) === index
  );
  const orderTotalPrice = totalPriceOrder(uniqueOrderIngredients);
  const orderStatus = getStatus(order);

  return (
    <div className={styles.wrapper}>
      <h3 className={"text text_type_main-medium mt-10 mb-3"}>{order.name}</h3>
      <p
        className={clsx(
          "text text_type_main-default mb-15",
          order?.status === "done" ? styles.statusCompleted : { color: "#FFF" }
        )}
      >
        {orderStatus}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.ingredientsList}>
        {uniqueOrderIngredients.map((ingredient) => {
          const ingredientCount = order.ingredients?.filter(
            (element) => element === ingredient._id
          ).length;
          return (
            <li
              className={clsx(styles.ingredientItem, "mr-6")}
              key={ingredient._id}
            >
              <div className={styles.ingredientInfo}>
                <div className={clsx(styles.iconWrapper, "mr-4")}>
                  <img
                    alt={ingredient.name}
                    src={ingredient.image}
                    className={styles.ingredientIcon}
                  ></img>
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
              </div>
              <p
                className={`${styles.ingredientPrice} text text_type_digits-default`}
              >
                {`${ingredientCount} x ${ingredient.price}`}
                <CurrencyIcon type="primary" />
              </p>
            </li>
          );
        })}
      </ul>
      <div className={clsx(styles.totalWrapper, "mt-10")}>
        <div>
          <FormattedDate
            date={orderDate}
            className={"text text_type_main-default text_color_inactive"}
          />
          <span
            className={"text text_type_main-default text_color_inactive"}
          >{` i-GMT+${timeZoneOffset}`}</span>
        </div>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default mr-2">
            {orderTotalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
