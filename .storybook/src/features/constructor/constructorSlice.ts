import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Ingredient {
  id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
}

interface ConstructorState {
  ingredients: Ingredient[];
}

const initialState: ConstructorState = {
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((ingredient) => ingredient.id !== action.payload);
    },
    moveIngredient: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, removed);
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient } = constructorSlice.actions;
export default constructorSlice.reducer;