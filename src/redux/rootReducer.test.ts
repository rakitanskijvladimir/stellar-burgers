import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('должен правильно инициализировать редьюсеры', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      constructor: expect.any(Function), // Ожидаем функцию
      ingredients: expect.any(Object),   // Ожидаем объект
    });
  });
});