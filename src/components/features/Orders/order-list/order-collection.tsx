import React from "react";
import clsx from "clsx";

import styles from "./order-collection.module.css";

import { TFullOrder } from "../../../../utils/data-blueprint";

import OrderCard from "../purchase-card/item-preview";

type TOrdersProps = {
  orders: TFullOrder[];
};

export default function OrdersCollection({ orders }: TOrdersProps) {
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.list, "pr-2")}>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
