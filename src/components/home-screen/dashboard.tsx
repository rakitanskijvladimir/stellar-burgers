import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import clsx from "clsx";
import styles from "./dashboard.module.css";

import BurgerConstructor from "../features/burger-lab/stack-master";
import BurgerIngredients from "../burger-stuff/toppings-tray";

export default function Main() {
  return (
    <DndProvider backend={HTML5Backend}>
      <section className={clsx(styles.ingredients, "mr-15")}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <BurgerIngredients />
      </section>
      <BurgerConstructor />
    </DndProvider>
  );
}
