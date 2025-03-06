import React from "react";
import { Link, Location, useLocation } from "react-router-dom";

import clsx from "clsx";
import styles from "./item-preview.module.css";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  TFromLocation,
  TFullOrder,
  useAppSelector,
} from "../../../../utils/data-blueprint";

import { ingredientsListSelector } from "../../../../services/operations/deep-selector-utils";

import {
  collectOrderIngredients,
  getStatus,
  totalPriceOrder,
} from "../../../../utils/magic-helper-functions";

type TOrderCardProps = {
  order: TFullOrder;
};

export default function CardOrder({ order }: TOrderCardProps) {
  const location: Location<TFromLocation> = useLocation();
  const isProfileOrder = location.pathname === "/profile/orders";
  const ingredients = useAppSelector(ingredientsListSelector);

  const orderDate = new Date(order.createdAt);
  const timeZoneOffset = (orderDate.getTimezoneOffset() * -1) / 60;

  const orderIngredients = collectOrderIngredients(order, ingredients);
  const totalOrderPrice = totalPriceOrder(orderIngredients);

  const orderStatus = getStatus(order);

  const orderPath = !isProfileOrder
    ? `/feed/${order.number}`
    : `/profile/orders/${order.number}`;

  return (
    <Link
      to={orderPath}
      className={styles.card}
      state={{ background: location }}
    >
      <div className={clsx(styles.wrapper, "mt-6 mr-6 mb-6 ml-6")}>
        <div className={clsx(styles.header)}>
          <h3
            className={"text text_type_digits-default"}
          >{`#${order.number}`}</h3>
          <div>
            <FormattedDate
              date={orderDate}
              className={"text text_type_main-default text_color_inactive"}
            />
            <span
              className={"text text_type_main-default text_color_inactive"}
            >{` i-GMT+${timeZoneOffset}`}</span>
          </div>
        </div>
        <div>
          <h2 className={"text text_type_main-medium mt-6"}>{order.name}</h2>
        </div>
        {isProfileOrder && (
          <p
            className={clsx(
              "text text_type_main-default mt-2",
              order?.status === "pending"
                ? styles.pendingStatus
                : { color: "#FFF" }
            )}
          >
            {orderStatus}
          </p>
        )}

        <div className={clsx(styles.details, "mt-6")}>
          <div className={styles.iconsWrapper}>
            {orderIngredients.slice(0, 5).map((ingredient, index) => (
              <div key={index} className={styles.iconWrapper}>
                <img
                  alt={ingredient.name}
                  src={ingredient.image}
                  className={styles.icon}
                ></img>
              </div>
            ))}
            {orderIngredients.length > 5 && (
              <div className={clsx(styles.iconWrapper, styles.additionalCount)}>
                <img
                  alt="Фото"
                  src={"https://code.s3.yandex.net/react/code/cheese.png"}
                  className={styles.icon}
                ></img>
                <p
                  className={clsx(
                    styles.additionalCountText,
                    "text text_type_main-default"
                  )}
                >{`+${orderIngredients.length - 5}`}</p>
              </div>
            )}
          </div>
          <div className={styles.priceWrapper}>
            <p className="text text_type_digits-default">{totalOrderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}
