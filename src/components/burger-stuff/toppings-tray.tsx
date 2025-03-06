import React, { useRef, useState, RefObject } from "react";
import clsx from "clsx";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./toppings-tray.module.css";

import { useAppSelector } from "../../utils/data-blueprint";
import { ingredientsListSelector } from "../../services/operations/deep-selector-utils";

import Ingredient from "../food-components/essence";
  
export default function IngredientsDisplay() {
  const selectedIngredients = useAppSelector(ingredientsListSelector);
  const [currentTab, setCurrentTab] = useState<string>("bun");

  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const bunsHeaderRef = useRef<HTMLHeadingElement>(null);
  const saucesHeaderRef = useRef<HTMLHeadingElement>(null);
  const mainsHeaderRef = useRef<HTMLHeadingElement>(null);

  const determineActiveTab = (): void => {
    if (
      !tabsWrapperRef.current ||
      !bunsHeaderRef.current ||
      !saucesHeaderRef.current ||
      !mainsHeaderRef.current
    ) {
      return;
    }

    const tabsOffset = tabsWrapperRef.current.getBoundingClientRect().top;
    const bunsOffset = Math.abs(tabsOffset - bunsHeaderRef.current.getBoundingClientRect().top);
    const saucesOffset = Math.abs(tabsOffset - saucesHeaderRef.current.getBoundingClientRect().top);
    const mainsOffset = Math.abs(tabsOffset - mainsHeaderRef.current.getBoundingClientRect().top);

    const nearestTab = Math.min(bunsOffset, saucesOffset, mainsOffset);

    setCurrentTab(
      nearestTab === bunsOffset
        ? "bun"
        : nearestTab === saucesOffset
        ? "sauce"
        : "main"
    );
  };

  const smoothScrollTo = (ref: RefObject<HTMLHeadingElement>, tab: string): void => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setCurrentTab(tab);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs} ref={tabsWrapperRef}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          onClick={() => smoothScrollTo(bunsHeaderRef, "bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={() => smoothScrollTo(saucesHeaderRef, "sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={() => smoothScrollTo(mainsHeaderRef, "main")}
        >
          Начинки
        </Tab>
      </div>
      <div className={clsx(styles.sections, "mt-10")} onScroll={determineActiveTab}>
        <h2 className={clsx("text text_type_main-medium")} ref={bunsHeaderRef}>
          Булки
        </h2>
        <div className={clsx(styles.items, "mt-6 ml-4")}>
          {selectedIngredients.map((item) => {
            if (item.type === "bun") {
              return <Ingredient key={item._id} ingredient={item} />;
            }
            return null;
          })}
        </div>
        <h2 className={clsx("text text_type_main-medium mt-10")} ref={saucesHeaderRef}>
          Соусы
        </h2>
        <div className={clsx(styles.items, "mt-6 ml-4")}>
          {selectedIngredients.map((item) => {
            if (item.type === "sauce") {
              return <Ingredient key={item._id} ingredient={item} />;
            }
            return undefined;
          })}
        </div>
        <h2 className={clsx("text text_type_main-medium mt-10")} ref={mainsHeaderRef}>
          Начинки
        </h2>
        <div className={clsx(styles.items, "mt-6 ml-4")}>
          {selectedIngredients.map((item) => {
            if (item.type === "main") {
              return <Ingredient key={item._id} ingredient={item} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
