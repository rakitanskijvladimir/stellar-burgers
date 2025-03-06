import React, { ReactNode } from "react";


import styles from "./navigation-link.module.css";
import { NavLink } from "react-router-dom";

type NavigationLinkProps = {
  className?: string;
  link: string;
  children?: ReactNode;
};

export default function NavigationLink({
  className,
  link,
  children,
}: NavigationLinkProps) {
  const getClassName = ({ isActive }: { isActive: boolean }): string =>
    `${isActive ? styles.active : styles.inactive} ${className || ""}`.trim();

  return (
    <NavLink className={getClassName} to={link}>
      {children}
    </NavLink>
  );
}
