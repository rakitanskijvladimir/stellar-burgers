import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const createBurgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: { ...ingredient, id },
          error: null,
          meta: null
        };
      },
      reducer: (state, action) => {
        const type = action.payload.type;
        if (type !== 'bun') {
          state.ingredients.push(action.payload);
        } else {
          state.bun = action.payload;
        }
      }
    },

    deleteItem: (state, action) => {
      if (action.payload.type !== 'bun') {
        state.ingredients = state.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.bun = null;
      }
    },

    upItem: (state, action) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > 0) {
        [state.ingredients[index - 1], state.ingredients[index]] = [
          state.ingredients[index],
          state.ingredients[index - 1]
        ];
      }
    },

    downItem: (state, action) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },

    clearItem: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    itemSelect: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export const { addItem, deleteItem, upItem, downItem, clearItem } =
  createBurgerSlice.actions;

export const { itemSelect } = createBurgerSlice.selectors;
export const burgerConstructorReducer = createBurgerSlice.reducer;
