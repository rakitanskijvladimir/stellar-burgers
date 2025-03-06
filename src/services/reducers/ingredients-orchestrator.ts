import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredientsList } from "../../utils/universal-api";
import { TIngredient } from "../../utils/data-blueprint";

export const initialState: { ingredients: TIngredient[] } = {
  ingredients: [],
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/get",
  getIngredientsList
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.data;
    });
  },
});

export default ingredientsSlice.reducer;
