import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../../utils/data-blueprint";
import { orderSelector } from "../../../../services/operations/deep-selector-utils";

import Modal from "../base-popups/universal-popup";
import Loader from "../../../spinners/loader";
import OrderDetails from "../../../features/Orders/purchase-summary/checkout-receipt";

export default function ModalCreateOrder() {
  const navigate = useNavigate();
  const order = useAppSelector(orderSelector);

  const handleClose = () => navigate("/");

  const renderContent = () => {
    if (!order.number) {
      return <Loader />;
    }
    if (order.number > 0) {
      return <OrderDetails />;
    }
    return null;
  };

  return <Modal onClose={handleClose}>{renderContent()}</Modal>;
}
