import React from "react";
import { useDrag } from "react-dnd";
import { Link, Location, useLocation } from "react-router-dom";

import clsx from "clsx";
import styles from "./essence.module.css";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { burgerConstructorSelector } from "../../services/operations/deep-selector-utils";

import {
  TFromLocation,
  TIngredient,
  TIngredientConstructor,
  useAppSelector,
} from "../../utils/data-blueprint";

type TItemIngredientProps = {
  ingredient: TIngredient;
};

type TDragCollectedProps = { isDrag: boolean };

export default function ItemIngredient({ ingredient }: TItemIngredientProps) {
  const constructorData: TIngredientConstructor = useAppSelector(
    burgerConstructorSelector
  );
  const currentLocation: Location<TFromLocation> = useLocation();

  function getCount(): number {
    if (ingredient.type !== "bun") {
      return constructorData.filling.filter(
        (item) => item._id === ingredient._id
      ).length;
    }
    if (
      constructorData.bun !== null &&
      ingredient._id === constructorData.bun._id
    ) {
      return 2;
    }
    return 0;
  }

  const ingredientCount = getCount();

  const [{ isDrag }, dragRef] = useDrag<
    TIngredient,
    unknown,
    TDragCollectedProps
  >({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <Link
      className={clsx(styles.wrapper, isDrag ? styles.dragging : "")}
      ref={dragRef}
      to={`/ingredient/${ingredient._id}`}
      state={{ background: currentLocation }}
    >
      <div className={styles.counter}>
        {ingredientCount !== 0 && (
          <Counter count={ingredientCount} size="default" />
        )}
      </div>
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={clsx(styles.priceWrapper, "mt-1 mb-1")}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </Link>
  );
}
