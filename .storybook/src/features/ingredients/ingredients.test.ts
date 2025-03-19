import ingredientsReducer, {
    fetchIngredientsRequest,
    fetchIngredientsSuccess,
    fetchIngredientsFailed,
  } from './ingredientsSlice';
  import { Ingredient } from './ingredientsSlice'; 
  
  describe('ingredientsSlice', () => {
    const initialState = {
      data: [] as Ingredient[], 
      isLoading: false,
      error: null,
    };
  
    it('должен обрабатывать экшен fetchIngredientsRequest', () => {
      const action = fetchIngredientsRequest();
      const state = ingredientsReducer(initialState, action);
  
      expect(state.isLoading).to.be.true; 
      expect(state.error).to.be.null; 
    });
  
    it('должен обрабатывать экшен fetchIngredientsSuccess', () => {
      const ingredients: Ingredient[] = [{ id: '1', name: 'Булка', type: 'bun' }]; 
      const action = fetchIngredientsSuccess(ingredients);
      const state = ingredientsReducer({ ...initialState, isLoading: true }, action);
  
      expect(state.data).to.deep.equal(ingredients); 
      expect(state.isLoading).to.be.false; 
    });
  
    it('должен обрабатывать экшен fetchIngredientsFailed', () => {
      const error = 'Ошибка загрузки';
      const action = fetchIngredientsFailed(error);
      const state = ingredientsReducer({ ...initialState, isLoading: true }, action);
  
      expect(state.error).to.equal(error); 
      expect(state.isLoading).to.be.false; 
    });
  });
  