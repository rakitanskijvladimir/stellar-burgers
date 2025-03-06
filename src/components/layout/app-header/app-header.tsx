import React from "react";
import { Location, Outlet, useLocation } from "react-router-dom";

import clsx from "clsx";
import styles from "./app-header.module.css";

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import NavigationLink from "../../navigation-link/navigation-link";

import { TFromLocation } from "../../../utils/data-blueprint";

export default function AppHeader() {
  const currentLocation: Location<TFromLocation> = useLocation();
  const currentPath = currentLocation.pathname;

  const isPathActive = (path: string): boolean => currentPath === path;

  return (
    <>
      <header className={clsx(styles.header, "pt-4 pb-4")}>
        <nav className={styles.navContainer}>
          <div className={styles.navigationGroup}>
            <NavigationLink className={"pl-5 pr-5 pb-4 pt-4 mr-2"} link="/">
              <>
                <BurgerIcon
                  type={isPathActive("/") ? "primary" : "secondary"}
                />
                <span
                  className={clsx(
                    "text text_type_main-default ml-2",
                    isPathActive("/") ? styles.active : styles.inactive
                  )}
                >
                  Конструктор
                </span>
              </>
            </NavigationLink>
            <NavigationLink className={"pl-5 pr-5 pb-4 pt-4 mr-2"} link="/feed">
              <>
                <ListIcon
                  type={isPathActive("/feed") ? "primary" : "secondary"}
                />
                <span
                  className={clsx(
                    "text text_type_main-default ml-2",
                    isPathActive("/feed") ? styles.active : styles.inactive
                  )}
                >
                  Лента заказов
                </span>
              </>
            </NavigationLink>
          </div>
          <div className={styles.logoWrapper}>
            <NavigationLink link="/">
              <Logo />
            </NavigationLink>
          </div>
          <div className={styles.profileLink}>
            <NavigationLink
              className={"pl-5 pr-5 pb-4 pt-4 mr-2"}
              link="/profile"
            >
              <>
                <ProfileIcon
                  type={isPathActive("/profile") ? "primary" : "secondary"}
                />
                <span
                  className={clsx(
                    "text text_type_main-default ml-2",
                    isPathActive("/profile") ? styles.active : styles.inactive
                  )}
                >
                  Личный кабинет
                </span>
              </>
            </NavigationLink>
          </div>
        </nav>
      </header>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </>
  );
}
