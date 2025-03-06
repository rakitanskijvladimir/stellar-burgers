import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import styles from "../order-tracker/track-package.module.css";

import { useAppDispatch, useAppSelector } from "../../../utils/data-blueprint";
import { orderInfoSelector } from "../../../services/operations/deep-selector-utils";
import { fetchOrderInfo } from "../../../services/reducers/order-inspector-slice";

import OrderInfo from "../../../components/features/Orders/order-info/order-info";

export default function OrderIdPage() {
  const dispatch = useAppDispatch();
  const order = useAppSelector(orderInfoSelector);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderInfo(id));
    }
  }, [dispatch, id]);

  if (!order) {
    return null;
  }

  return (
    <div className={styles.container}>
      <p className={clsx(styles.number, "text text_type_digits-default")}>
        {`#${order.number}`}
      </p>
      <OrderInfo order={order} />
    </div>
  );
}
