import React from "react";
import clsx from "clsx";
import { useAppSelector } from "../../utils/data-blueprint";
import styles from "./overview-panel.module.css";

import {
  totalSelector,
  ordersSelector,
  totalTodaySelector,
} from "../../services/operations/deep-selector-utils";

export default function StatsDisplay() {
  const ordersData = useAppSelector(ordersSelector);
  const allTimeOrders = useAppSelector(totalSelector);
  const todayOrdersCount = useAppSelector(totalTodaySelector);

  return (
    <div className={clsx(styles.wrapper, "mt-25")}>
      <div className={styles.statusContainer}>
        <div className={styles.orderSection}>
          <h3 className={"text text_type_main-medium"}>Готовы:</h3>
          <div className={clsx(styles.orderNumbers, styles.completed)}>
            {ordersData.map((order) => {
              if (order.status === "done") {
                return (
                  <p className={"text text_type_digits-default"} key={order._id}>
                    {order.number}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className={styles.orderSection}>
          <h3 className={"text text_type_main-medium"}>В работе:</h3>
          <div className={styles.orderNumbers}>
            {ordersData.map((order) => {
              if (order.status !== "done") {
                return (
                  <p className={"text text_type_digits-default"} key={order._id}>
                    {order.number}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <div>
        <h3 className={"text text_type_main-medium"}>Выполнено за все время:</h3>
        <p className={clsx(styles.totalCount, "text text_type_digits-large")}>
          {allTimeOrders}
        </p>
      </div>
      <div>
        <h3 className={"text text_type_main-medium"}>Выполнено за сегодня:</h3>
        <p className={clsx(styles.totalCount, "text text_type_digits-large")}>
          {todayOrdersCount}
        </p>
      </div>
    </div>
  );
}
