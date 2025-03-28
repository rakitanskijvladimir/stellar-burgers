import React from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";

import clsx from "clsx";
import { Tooltip } from "react-tooltip";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useAppSelector, TFromLocation, TIngredient, TIngredientConstructor } from "../../../utils/data-blueprint";

import {
  burgerConstructorSelector,
  orderTotalSelector,
  userSelector,
} from "../../../services/operations/deep-selector-utils";

import {
  addFilling,
  clearConstructor,
  removeFillingElement,
  setBun,
} from "../../../services/reducers/builder-tool-slice";

import { fetchOrder } from "../../../services/reducers/order-overlord-slice";

import IngredientConstructor from "../ingredient-mixer/flavor-designer";
import styles from "./stack-master.module.css";

type TCollectedProps = { isDropIngredient: boolean };

export default function BurgerBuilder() {
  const total = useAppSelector(orderTotalSelector);
  const user = useAppSelector(userSelector);
  const burgerConstructor: TIngredientConstructor = useAppSelector(burgerConstructorSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location: Location<TFromLocation> = useLocation();

  const [{ isDropIngredient }, dropRefIngredient] = useDrop<
    TIngredient,
    unknown,
    TCollectedProps
  >({
    accept: "ingredient",
    drop(ingredient) {
      if (ingredient.type === "bun") {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addFilling({ ...ingredient, uuid: uuid() }));
      }
    },
    collect: (monitor) => ({
      isDropIngredient: monitor.isOver(),
    }),
  });

  const ingredientIdList = (): Array<string> => {
    const list = [];
    if (burgerConstructor.bun !== null) {
      list.push(burgerConstructor.bun._id);
    }
    burgerConstructor.filling.forEach((ingredient) => {
      list.push(ingredient._id);
    });
    if (burgerConstructor.bun !== null) {
      list.push(burgerConstructor.bun._id);
    }
    return list;
  };

  const createOrder = () => {
    if (burgerConstructor.bun == null) {
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/", { state: { background: location } });
    dispatch(fetchOrder(ingredientIdList()));
    dispatch(clearConstructor());
  };

  const isEmptyConstructor =
    !burgerConstructor.bun && burgerConstructor.filling.length === 0;

  return (
    <section className={clsx(styles.section, "mt-25 ml-4")}>
      <div
        className={clsx(
          styles.container,
          isDropIngredient ? styles.dragging : ""
        )}
        ref={dropRefIngredient}
      >
        <div className={"ml-8"}>
          {burgerConstructor.bun && (
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={`${burgerConstructor.bun.name} (верх)`}
              thumbnail={burgerConstructor.bun.image}
              price={burgerConstructor.bun.price}
            />
          )}
        </div>
        <div className={styles.main}>
          {isEmptyConstructor && (
            <p
              className={clsx(
                styles.textClue,
                "text text_type_main-small text_color_inactive"
              )}
            >
              Перетащи ингредиент, чтобы собрать свой космический бургер
            </p>
          )}
          {burgerConstructor.filling.map((ingredient, index) => (
            <IngredientConstructor
              key={ingredient.uuid}
              ingredient={ingredient}
              handleRemove={() => dispatch(removeFillingElement(index))}
              index={index}
            />
          ))}
        </div>
        <div className={"ml-8"}>
          {burgerConstructor.bun && (
            <ConstructorElement
              type={"bottom"}
              isLocked={true}
              text={`${burgerConstructor.bun.name} (низ)`}
              thumbnail={burgerConstructor.bun.image}
              price={burgerConstructor.bun.price}
            />
          )}
        </div>
      </div>
      <div className={clsx(styles.createOrder, "mt-10")}>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-medium">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div data-tooltip-id="order-button">
          <Button
            htmlType="button"
            disabled={!burgerConstructor.bun}
            type="primary"
            size="medium"
            onClick={createOrder}
          >
            Оформить заказ
          </Button>
        </div>
        {!burgerConstructor.bun && (
          <Tooltip
            className={"text text_type_main-small"}
            id={"order-button"}
            content={"Не хватает булочки"}
          />
        )}
      </div>
    </section>
  );
}
