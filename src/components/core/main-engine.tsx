import React, { useEffect } from "react";
import { Location, Route, Routes, useLocation } from "react-router-dom";

import { TFromLocation, useAppDispatch } from "../../utils/data-blueprint";

import { fetchIngredients } from "../../services/reducers/ingredients-orchestrator";
import { fetchUserInfo } from "../../services/reducers/auth-power-slice";

import styles from "./app.module.css";

import AppHeader from "../layout/app-header/app-header";
import Main from "../home-screen/dashboard";

import Login from "../../pages/auth/login-page/login-page";
import Registration from "../../pages/auth/enter-hub/doorway";
import ForgotPassword from "../../pages/auth/memory-reset/brain-refresh";
import ResetPassword from "../../pages/auth/password-reboot/code-reset";

import Feed from "../../pages/live-stream/updates-stream";
import NotFound404 from "../../pages/lost-realm/oops-404";
import Profile from "../../pages/profile/dashboard";
import ProfileEdit from "../../pages/profile/tweak-profile/adjust-settings";
import OrdersHistory from "../../pages/orders/past-orders/history-log";

import IngredientPage from "../../pages/recipe-details/food-info";
import OrderCreatePage from "../../pages/orders/anew-order/place-order";
import OrderIdPage from "../../pages/orders/order-tracker/track-package";

import ModalIngredient from "../layout/Modal/ingredient-popup/recipe-popup";
import ModalOrderId from "../layout/Modal/order-details-popup/shipment-tracker";
import ModalCreateOrder from "../layout/Modal/order-popup/purchase-popup";

import { OnlyAuth, OnlyUnAuth } from "../secure-routes/access-guard";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location: Location<TFromLocation> = useLocation();
  const background = location?.state?.background || null;

  useEffect(() => {
    try {
      dispatch(fetchIngredients());

      const token = localStorage.getItem("accessToken");
      if (token) {
        dispatch(fetchUserInfo());
      } else {
        console.warn("Пользователь не авторизован");
      }
    } catch (error) {
      console.error("Ошибка при инициализации приложения:", error);
    }
  }, [dispatch]);

  const renderRoutes = () => (
    <Routes location={background || location}>
      <Route path="/" element={<AppHeader />}>
        <Route index element={<Main />} />
        <Route path="/ingredient/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/order"
          element={<OnlyAuth component={<OrderCreatePage />} />}
        />
        <Route path="/feed/:id" element={<OrderIdPage />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Registration />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route path="/profile" element={<ProfileEdit />} />
          <Route path="/profile/orders" element={<OrdersHistory />} />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={<OnlyAuth component={<OrderIdPage />} />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );

  const renderModalRoutes = () =>
    background && (
      <Routes>
        <Route path="/ingredient/:id" element={<ModalIngredient />} />
        <Route path="/feed/:id" element={<ModalOrderId />} />
        <Route path="/profile/orders/:id" element={<ModalOrderId />} />
        <Route
          path="/"
          element={<OnlyAuth component={<ModalCreateOrder />} />}
        />
      </Routes>
    );

  return (
    <div className={styles.app}>
      {renderRoutes()}
      {renderModalRoutes()}
    </div>
  );
};

export default App;
