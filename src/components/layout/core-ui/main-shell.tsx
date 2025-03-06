import React, { useEffect } from "react";
import { Location, Route, Routes, useLocation } from "react-router-dom";

import clsx from "clsx";
import styles from "./main-shell.module.css";

import Header from "../app-header/app-header";
import MainPage from "../../home-screen/dashboard";

import PageNotFound from "../../../pages/lost-realm/oops-404";
import UserProfile from "../../../pages/profile/dashboard";
import EditProfile from "../../../pages/profile/tweak-profile/adjust-settings";

import PageIngredient from "../../../pages/recipe-details/food-info";
import IngredientModal from "../Modal/ingredient-popup/recipe-popup";

import LoginPage from "../../../pages/auth/login-page/login-page";
import SignUpPage from "../../../pages/auth/enter-hub/doorway";
import ForgotPasswordPage from "../../../pages/auth/memory-reset/brain-refresh";
import ResetPasswordPage from "../../../pages/auth/password-reboot/code-reset";

import { OnlyAuth, OnlyUnAuth } from "../../secure-routes/access-guard";

import { fetchIngredients } from "../../../services/reducers/ingredients-orchestrator";
import { fetchUserInfo } from "../../../services/reducers/auth-power-slice";

import OrderHistory from "../../../pages/orders/past-orders/history-log";
import OrderFeed from "../../../pages/live-stream/updates-stream";
import CreateOrderPage from "../../../pages/orders/anew-order/place-order";
import OrderDetailsPage from "../../../pages/orders/order-tracker/track-package";

import OrderDetailsModal from "../Modal/order-details-popup/shipment-tracker";
import CreateOrderModal from "../Modal/order-popup/purchase-popup";

import { TFromLocation, useAppDispatch } from "../../../utils/data-blueprint";

function ContainerApp() {
  const dispatch = useAppDispatch();
  const location: Location<TFromLocation> = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredients());

    if (localStorage.getItem("accessToken")) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Routes location={background || location}>
        <Route path="/" element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path="/ingredient/:id" element={<PageIngredient />} />
          <Route path="/feed" element={<OrderFeed />} />
          <Route
            path="/order"
            element={<OnlyAuth component={<CreateOrderPage />} />}
          />
          <Route path="/feed/:id" element={<OrderDetailsPage />} />
          <Route
            path="/login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<SignUpPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
          <Route
            path="/profile"
            element={<OnlyAuth component={<UserProfile />} />}
          >
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/profile/orders" element={<OrderHistory />} />
          </Route>
          <Route
            path="/profile/orders/:id"
            element={<OnlyAuth component={<OrderDetailsPage />} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredient/:id" element={<IngredientModal />} />
          <Route path="/feed/:id" element={<OrderDetailsModal />} />
          <Route path="/profile/orders/:id" element={<OrderDetailsModal />} />
          <Route
            path="/"
            element={<OnlyAuth component={<CreateOrderModal />} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default ContainerApp;
