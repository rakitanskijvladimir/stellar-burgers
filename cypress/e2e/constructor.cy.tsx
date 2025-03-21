describe('Конструктор бургера', () => {
  const baseURL = 'http://localhost:3000'; // Замените на URL своего приложения

  beforeEach(() => {
    // Перехватываем запросы к API, подменяя их fixture данными
    cy.intercept('GET', `${baseURL}/api/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', `${baseURL}/api/auth/login`, { fixture: 'user.json' }).as('login');
    cy.intercept('GET', `${baseURL}/api/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', `${baseURL}/api/orders`, { fixture: 'order.json' }).as('createOrder');

    // Устанавливаем моковые токены авторизации
    window.localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.setCookie('accessToken', 'mockAccessToken');

    // Переходим на страницу конструктора
    cy.visit('/');

    // Ожидаем загрузку данных (ингредиентов)
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // Очистка cookies и localStorage после каждого теста
    cy.clearCookies();
    window.localStorage.clear();
  });

  it('Добавление ингредиентов в конструктор', () => {
    // Проверяем, что разделы ингредиентов загрузились
    cy.get('[data-cy="section_ingredients_bun"]').should('exist');
    cy.get('[data-cy="section_ingredients_sauce"]').should('exist');
    cy.get('[data-cy="section_ingredients_main"]').should('exist');

    // Добавляем булку в конструктор
    cy.get('[data-cy="section_ingredients_bun"]').first().find('button').click();
    cy.get('[data-cy="section_constructor_element_top_bun"]').should('exist');
    cy.get('[data-cy="section_constructor_element_bottom_bun"]').should('exist');

    // Добавляем соус в конструктор
    cy.get('[data-cy="section_ingredients_sauce"]').first().find('button').click();
    cy.get('[data-cy="section_constructor_element_sauce"]').should('exist');

    // Добавляем начинку в конструктор
    cy.get('[data-cy="section_ingredients_main"]').first().find('button').click();
    cy.get('[data-cy="section_constructor_element_main"]').should('exist');
  });

  it('Работа модальных окон', () => {
    // Открываем модальное окно ингредиента
    cy.get('[data-cy="section_ingredients_bun"]').first().find('a').click();
    cy.get('[data-cy="modal_content"]').should('exist');

    // Закрываем модальное окно по клику на крестик
    cy.get('[data-cy="modal_close_button"]').click();
    cy.get('[data-cy="modal_content"]').should('not.exist');

    // Снова открываем модальное окно
    cy.get('[data-cy="section_ingredients_bun"]').first().find('a').click();
    cy.get('[data-cy="modal_content"]').should('exist');

    // Закрываем модальное окно по клику на оверлей
    cy.get('[data-cy="modal_overlay"]').click({ force: true });
    cy.get('[data-cy="modal_content"]').should('not.exist');
  });

  it('Создание заказа', () => {
    // Добавляем ингредиенты в конструктор
    cy.get('[data-cy="section_ingredients_bun"]').first().find('button').click();
    cy.get('[data-cy="section_ingredients_main"]').first().find('button').click();
    cy.get('[data-cy="section_ingredients_sauce"]').first().find('button').click();

    // Оформляем заказ
    cy.get('[data-cy="on_order_button"]').click();

    // Проверяем, что модальное окно с номером заказа открылось
    cy.get('[data-cy="modal_content"]').should('exist');
    cy.get('[data-cy="modal_content"]').contains('87787'); // Номер заказа из fixture

    // Закрываем модальное окно
    cy.get('[data-cy="modal_close_button"]').click();
    cy.get('[data-cy="modal_content"]').should('not.exist');

    // Проверяем, что конструктор пуст
    cy.get('[data-cy="section_constructor_element_top_bun"]').should('not.exist');
    cy.get('[data-cy="section_constructor_element_main"]').should('not.exist');
    cy.get('[data-cy="section_constructor_element_sauce"]').should('not.exist');
  });
});