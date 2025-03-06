import React from "react";
import { useParams } from "react-router-dom";

import styles from "./food-info.module.css";

import IngredientInfo from "../../components/ingredient-info/ingredient-info";
import { ingredientsListSelector } from "../../services/operations/deep-selector-utils";
import { TIngredient, useAppSelector } from "../../utils/data-blueprint";

export default function IngredientPage() {
  const { id } = useParams<{ id: string }>();
  const ingredients: TIngredient[] = useAppSelector(ingredientsListSelector);
  const ingredient = ingredients.find((item) => item._id === id);

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      {ingredient && <IngredientInfo ingredient={ingredient} />}
    </div>
  );
}
