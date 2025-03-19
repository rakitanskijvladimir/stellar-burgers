import { expect } from 'chai';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('должен правильно инициализировать редьюсеры', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).to.include.keys('constructor', 'ingredients');
    expect(initialState.constructor).to.be.an('object');
    expect(initialState.ingredients).to.be.an('object');
  });
});
