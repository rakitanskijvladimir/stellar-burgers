import { useEffect } from "react";
import {
  Location,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  TFromLocation,
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/data-blueprint";

import { orderInfoSelector } from "../../../../services/operations/deep-selector-utils";
import { fetchOrderInfo } from "../../../../services/reducers/order-inspector-slice";

import Modal from "../base-popups/universal-popup";
import OrderInfo from "../../../features/Orders/order-info/order-info";

export default function ModalOrderId() {
  const location: Location<TFromLocation> = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const order = useAppSelector(orderInfoSelector);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderInfo(id));
    }
  }, [dispatch, id]);

  if (!order) return null;

  const closeModalPath =
    location.pathname === `/profile/orders/${order.number}`
      ? "/profile/orders"
      : "/feed";

  const handleClose = () => navigate(closeModalPath);

  return (
    <Modal
      onClose={handleClose}
      titleClassName="text_type_digits-default"
      title={`#${order.number}`}
    >
      <OrderInfo order={order} />
    </Modal>
  );
}
