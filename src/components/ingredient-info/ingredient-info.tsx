import React from "react";

import clsx from "clsx";
import styles from "./ingredient-info.module.css";

import { TIngredient } from "../../utils/data-blueprint";

type TInfoIngredientProps = {
  ingredient: TIngredient;
};

export default function InfoIngredient({ ingredient }: TInfoIngredientProps) {
  return (
    <div className={styles.wrapper}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h3 className={"text text_type_main-medium mt-4 mb-8"}>
        {ingredient.name}
      </h3>
      <ul className={styles.details}>
        <li className={clsx(styles.item, "mr-5")}>
          <p className={"text text_type_main-default"}>Калории, ккал</p>
          <p className={"text text_type_digits-default"}>
            {ingredient.calories}
          </p>
        </li>
        <li className={clsx(styles.item, "mr-5")}>
          <p className={"text text_type_main-default"}>Белки, г</p>
          <p className={"text text_type_digits-default"}>
            {ingredient.proteins}
          </p>
        </li>
        <li className={clsx(styles.item, "mr-5")}>
          <p className={"text text_type_main-default"}>Жиры, г</p>
          <p className={"text text_type_digits-default"}>{ingredient.fat}</p>
        </li>
        <li className={styles.item}>
          <p className={"text text_type_main-default"}>Углеводы, г</p>
          <p className={"text text_type_digits-default"}>
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
