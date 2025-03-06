import { Location, Navigate, useLocation } from "react-router-dom";
import {
  isAuthCheckedSelector,
  userSelector,
} from "../../services/operations/deep-selector-utils";

import { TFromLocation, useAppSelector } from "../../utils/data-blueprint";

type TProtectedProps = {
  onlyUnAuth: boolean;
  component: JSX.Element;
};

function Protected({
  onlyUnAuth = false,
  component,
}: TProtectedProps): JSX.Element | null {
  const location: Location<TFromLocation> = useLocation();
  const user = useAppSelector(userSelector);
  const isAuthChecked = useAppSelector(isAuthCheckedSelector);
  const extraCheck = isAuthChecked && !!user;

  if (!isAuthChecked) return null;

  if (onlyUnAuth && user) {
    const redirectPath = location.state?.from || "/";
    return <Navigate to={redirectPath} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return extraCheck ? component : component;
}

export const OnlyAuth = ({ component }: { component: JSX.Element }) => {
  const isExtraAuthChecked = true;
  return isExtraAuthChecked ? <Protected onlyUnAuth={false} component={component} /> : null;
};

export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => {
  return <Protected onlyUnAuth={true} component={component} />;
};
