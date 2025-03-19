import 'cypress';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Перехват запросов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'api/auth/login', { fixture: 'user.json' }).as('login');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

    // Установка токенов
    window.localStorage.setItem('refreshToken', 'someValueRefreshToken');
    cy.setCookie('accessToken', 'someValueAccessToken');

    // Переход на страницу конструктора
    cy.visit('/');
  });

  afterEach(() => {
    // Очистка localStorage и cookies
    window.localStorage.clear();
    cy.clearCookies();
  });

  it('Добавление ингредиентов в конструктор', () => {
    // Проверка загрузки ингредиентов
    cy.wait('@getIngredients');

    // Добавление булки
    cy.get('[data-cy="section_ingredients_bun"]').first().find('button').click();
    cy.get('[data-cy="section_constructor_element_top_bun"]').should('exist');
    cy.get('[data-cy="section_constructor_element_bottom_bun"]').should('exist');

    // Добавление соуса
    cy.get('[data-cy="section_ingredients_sauce"]').last().find('button').click();
    cy.get('[data-cy="section_constructor_element_sauce"]').should('exist');
  });

  it('Работа модальных окон', () => {
    // Открытие модального окна ингредиента
    cy.get('[data-cy="section_ingredients_bun"]').first().find('a').click();
    cy.get('[data-cy="modal_content"]').should('exist');

    // Закрытие модального окна по клику на крестик
    cy.get('[data-cy="modal_close_button"]').click();
    cy.get('[data-cy="modal_content"]').should('not.exist');

    // Закрытие модального окна по клику на оверлей
    cy.get('[data-cy="section_ingredients_bun"]').first().find('a').click();
    cy.get('[data-cy="modal_overlay"]').click({ force: true });
    cy.get('[data-cy="modal_content"]').should('not.exist');
  });

  it('Создание заказа', () => {
    // Добавление ингредиентов
    cy.get('[data-cy="section_ingredients_bun"]').first().find('button').click();
    cy.get('[data-cy="section_ingredients_main"]').eq(1).find('button').click();
    cy.get('[data-cy="section_ingredients_sauce"]').last().find('button').click();

    // Оформление заказа
    cy.get('[data-cy="on_order_button"]').click();

    // Проверка модального окна с номером заказа
    cy.get('[data-cy="modal_content"]').should('exist');
    cy.get('[data-cy="modal_content"]').contains('87787');

    // Закрытие модального окна
    cy.get('[data-cy="modal_close_button"]').click();
    cy.get('[data-cy="modal_content"]').should('not.exist');

    // Проверка, что конструктор пуст
    cy.get('[data-cy="section_constructor_element_top_bun"]').should('not.exist');
    cy.get('[data-cy="section_constructor_element_main"]').should('not.exist');
    cy.get('[data-cy="section_constructor_element_sauce"]').should('not.exist');
  });
});