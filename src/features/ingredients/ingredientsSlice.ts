import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Ingredient {
  id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
}

interface IngredientsState {
  data: Ingredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  data: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    fetchIngredientsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchIngredientsSuccess: (state, action: PayloadAction<Ingredient[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchIngredientsFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchIngredientsRequest, fetchIngredientsSuccess, fetchIngredientsFailed } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;