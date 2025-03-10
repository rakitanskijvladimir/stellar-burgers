import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type TInitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;

  error: string | null;
};

const initialState: TInitialState = {
  isLoading: false,
  error: null,

  ingredients: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

const burgerContentSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    burgerLoadSelector: (state) => state.isLoading,
    burgerIngredientsSelector: (state) => state.ingredients,

    burgerErrorS: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось загрузить ингредиенты';
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      });
  }
});

export const { burgerErrorS, burgerLoadSelector, burgerIngredientsSelector } =
  burgerContentSlice.selectors;
export const ingredientsReducer = burgerContentSlice.reducer;
