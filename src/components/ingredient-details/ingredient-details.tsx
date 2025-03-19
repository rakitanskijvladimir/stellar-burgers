import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { burgerIngredientsSelector } from '@slices';

export const IngredientDetails: FC = () => {
  const { id: ingredientId } = useParams<{ id: string }>();
  const ingredients = useSelector(burgerIngredientsSelector);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
