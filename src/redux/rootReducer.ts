import { combineReducers } from '@reduxjs/toolkit';
import constructorReducer from '../features/constructor/constructorSlice';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';

const rootReducer = combineReducers({
  constructor: constructorReducer,
  ingredients: ingredientsReducer,
});

export default rootReducer;