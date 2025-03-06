import React from "react";
import { useDrag, useDrop } from "react-dnd";

import clsx from "clsx";
import styles from "./flavor-designer.module.css";

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { burgerConstructorSelector } from "../../../services/operations/deep-selector-utils";
import { moveFillingElement } from "../../../services/reducers/builder-tool-slice";

import { TIngredient, TIngredientConstructor, useAppDispatch, useAppSelector } from "../../../utils/data-blueprint";

type TCollectedProps = { isDrag: boolean };
type TIngredientEditorProps = {
  ingredient: TIngredient;
  handleRemove: () => void;
  index: number;
};

export default function IngredientEditor({
  ingredient,
  handleRemove,
  index,
}: TIngredientEditorProps) {
  const dispatch = useAppDispatch();
  const burgerConstructor: TIngredientConstructor = useAppSelector(burgerConstructorSelector);

  const [{ isDrag }, dragRef] = useDrag<TIngredient, unknown, TCollectedProps>({
    type: "sort",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<TIngredient, unknown, unknown>({
    accept: "sort",
    hover(dragIngredient) {
      if (dragIngredient.uuid === ingredient.uuid) return;

      dispatch(
        moveFillingElement({
          indexFrom: burgerConstructor.filling.indexOf(dragIngredient),
          indexTo: index,
          ingredient: dragIngredient,
        })
      );
    },
  });

  return (
    <div
      className={clsx(
        styles.editorContainer,
        isDrag ? styles.draggingStyle : ""
      )}
      ref={(element) => dragRef(dropRef(element))}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={handleRemove}
      />
    </div>
  );
}
