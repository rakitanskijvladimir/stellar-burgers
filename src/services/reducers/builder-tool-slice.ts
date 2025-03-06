import { createSlice } from "@reduxjs/toolkit";
import { TIngredientConstructor } from "../../utils/data-blueprint";

export const initialState: TIngredientConstructor = {
  bun: null,
  filling: [],
};

const burgerConstructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addFilling: (state, action) => {
      state.filling.push(action.payload);
    },
    clearConstructor: () => {
      return initialState;
    },
    moveFillingElement: (state, action) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      state.filling.splice(indexFrom, 1);
      state.filling.splice(indexTo, 0, ingredient);
    },
    removeFillingElement: (state, action) => {
      state.filling.splice(action.payload, 1);
    },
    setBun: (state, action) => {
      state.bun = action.payload;
    },
  },
});

export const {
  addFilling,
  clearConstructor,
  moveFillingElement,
  removeFillingElement,
  setBun,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
