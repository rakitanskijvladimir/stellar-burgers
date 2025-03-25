import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { deleteItem, downItem, upItem } from '@slices';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(downItem(ingredient));
    };

    const handleMoveUp = () => {
      dispatch(upItem(ingredient));
    };

    const handleClose = () => {
      dispatch(deleteItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        data-cy={
          ingredient.type === 'bun' && index === 0
            ? 'section_constructor_element_top_bun'
            : ingredient.type === 'bun' && index === totalItems - 1
              ? 'section_constructor_element_bottom_bun'
              : 'section_constructor_element_main'
        }
      />
    );
  }
);
