import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ingredientsListSelector } from "../../../../services/operations/deep-selector-utils";
import { TIngredient, useAppSelector } from "../../../../utils/data-blueprint";

import IngredientInfo from "../../../ingredient-info/ingredient-info";
import Modal from "../base-popups/universal-popup";

export default function ModalIngredient() {
  const ingredients = useAppSelector(ingredientsListSelector);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleClose = () => navigate("/");

  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) return null;

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <IngredientInfo ingredient={ingredient} />
    </Modal>
  );
}
