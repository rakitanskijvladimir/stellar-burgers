import constructorReducer, { addIngredient, removeIngredient, moveIngredient } from './constructorSlice';
import { Ingredient } from '../constructor/constructorSlice'; 

describe('constructorSlice', () => {
  const initialState = {
    ingredients: [],
  };

  it('должен обрабатывать добавление ингредиента', () => {
    const ingredient: Ingredient = { id: '1', name: 'Булка', type: 'bun' }; 
    const action = addIngredient(ingredient);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients).toEqual([ingredient]);
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const initialStateWithIngredients = {
      ingredients: [{ id: '1', name: 'Булка', type: 'bun' }] as Ingredient[], 
    };
    const action = removeIngredient('1');
    const state = constructorReducer(initialStateWithIngredients, action);

    expect(state.ingredients).toEqual([]);
  });

  it('должен обрабатывать изменение порядка ингредиентов', () => {
    const initialStateWithIngredients = {
      ingredients: [
        { id: '1', name: 'Булка', type: 'bun' },
        { id: '2', name: 'Соус', type: 'sauce' },
      ] as Ingredient[], 
    };
    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const state = constructorReducer(initialStateWithIngredients, action);

    expect(state.ingredients).toEqual([
      { id: '2', name: 'Соус', type: 'sauce' },
      { id: '1', name: 'Булка', type: 'bun' },
    ]);
  });
});