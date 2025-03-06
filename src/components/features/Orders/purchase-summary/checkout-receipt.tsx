import React from "react";
import clsx from "clsx";

import styles from "./checkout-receipt.module.css";
import iconDone from "../../../../images/icon-done.svg";

import { useAppSelector } from "../../../../utils/data-blueprint";
import { orderSelector } from "../../../../services/operations/deep-selector-utils";

export default function SummaryOrder() {
  const currentOrder = useAppSelector(orderSelector);

  return (
    <div className={clsx(styles.wrapper, "mt-10 mb-30")}>
      <h3 className={clsx(styles.orderNumber, "text text_type_digits-large")}>
        {currentOrder.number}
      </h3>
      <p className={"text text_type_main-medium mt-8"}>идентификатор заказа</p>
      <img
        className={clsx(styles.doneIcon, "mt-15 mb-15")}
        src={iconDone}
        alt="Заказ создан"
      />
      <p className={"text text_type_main-default"}>Ваш заказ начали готовить</p>
      <p className={clsx(styles.waitText, "text text_type_main-default mt-2")}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
