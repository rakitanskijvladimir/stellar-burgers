import React, { useEffect } from "react";
import clsx from "clsx";

import styles from "./updates-stream.module.css";
import OrderList from "../../components/features/Orders/order-list/order-collection";
import Dashboard from "../../components/control-hub/overview-panel";

import { wsEnd, wsStart } from "../../services/operations/game-master-handlers";
import { wsUrl } from "../../services/configs/super-duper-config";

import { useAppDispatch, useAppSelector } from "../../utils/data-blueprint";
import { ordersSelector } from "../../services/operations/deep-selector-utils";

export default function Feed() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(ordersSelector);

  useEffect(() => {
    dispatch(wsStart(`${wsUrl}/all`));

    return () => {
      dispatch(wsEnd());
    };
  }, [dispatch]);

  return (
    <>
      <section className={clsx(styles.orders, "mr-10")}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <OrderList orders={orders} />
      </section>
      <Dashboard />
    </>
  );
}
