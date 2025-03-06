import React from "react";
import { useParams } from "react-router-dom";

import styles from "./place-order.module.css";

import { useAppSelector } from "../../../utils/data-blueprint";
import { orderSelector } from "../../../services/operations/deep-selector-utils";

import Loader from "../../../components/spinners/loader";
import OrderDetails from "../../../components/features/Orders/purchase-summary/checkout-receipt";

export default function OrderCreatePage() {
  const { number } = useParams<{ number: string }>();
  const order = useAppSelector(orderSelector);

  return (
    <div className={styles.container}>
      {!order.number ? <Loader /> : <OrderDetails />}
    </div>
  );
}
