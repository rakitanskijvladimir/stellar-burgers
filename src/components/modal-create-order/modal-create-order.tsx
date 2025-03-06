import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../utils/data-blueprint";
import { orderSelector } from "../../services/operations/deep-selector-utils";

import Modal from "../layout/Modal/base-popups/universal-popup";
import Loader from "../spinners/loader";
import OrderDetails from "../features/Orders/purchase-summary/checkout-receipt";

export default function ModalCreateOrder() {
  const navigate = useNavigate();
  const order = useAppSelector(orderSelector);

  const handleClose = () => navigate("/");

  return (
    <Modal onClose={handleClose}>
      {!order.number ? <Loader /> : <OrderDetails />}
    </Modal>
  );
}
