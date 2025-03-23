describe('Конструктор бургера', () => {
  // Общие настройки перед каждым тестом
  const setupInterceptors = () => {
    cy.intercept('GET', 'api/ingredients', { fixture: '/ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'api/auth/login', { fixture: '/user.json' }).as('login');
    cy.intercept('GET', 'api/auth/user', { fixture: '/user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: '/order.json' }).as('createOrder');
  };

  const setupAuthentication = () => {
    window.localStorage.setItem('refreshToken', 'someValueRefreshToken');
    cy.setCookie('accessToken', 'someValueAccessToken');
  };

  const selectors = {
    ingredients: {
      bun: `[data-cy='section_ingredients_bun']`,
      sauce: `[data-cy='section_ingredients_sauce']`,
      main: `[data-cy='section_ingredients_main']`
    },
    constructor: {
      topBun: `[data-cy='section_constructor_element_top_bun']`,
      bottomBun: `[data-cy='section_constructor_element_bottom_bun']`,
      sauce: `[data-cy='section_constructor_element_sauce']`,
      main: `[data-cy='section_constructor_element_main']`
    },
    modal: {
      content: `[data-cy='modal_content']`,
      overlay: `[data-cy='modal_overlay']`
    },
    buttons: {
      orderButton: `[data-cy='on_order_button']`
    }
  };

  beforeEach(() => {
    setupInterceptors();
    setupAuthentication();
    cy.visit('/');

    // Алиасы для кнопок
    cy.get(`${selectors.ingredients.bun}`).first().find('button').as('bunAddButton');
    cy.get(`${selectors.ingredients.sauce}`).last().find('button').as('sauceAddButton');
    cy.get(`${selectors.ingredients.main}`).eq(1).find('button').as('mainAddButton');
    cy.get(`${selectors.ingredients.bun}`).first().find('a').as('ingredientDescription');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  context('Добавление булки и начинки в конструктор', () => {
    it('добавить булочку и соус в конструктор', () => {
      cy.get('@bunAddButton').click();
      cy.get(selectors.constructor.topBun).should('exist')
        .and('contain.text', 'Краторная булка N-200i (верх)');
      cy.get(selectors.constructor.bottomBun).should('exist')
        .and('contain.text', 'Краторная булка N-200i (низ)');

      cy.get('@sauceAddButton').click();
      cy.get(selectors.constructor.sauce).should('exist')
        .and('contain.text', 'Соус фирменный Space Sauce');
    });

    it('обновить счетчики при добавлении ингредиентов', () => {
      // Проверка счетчиков при добавлении ингредиентов
      const checkCounter = (selector: string, expectedCount: string | number) => { // Добавлены типы
        cy.get(selector).find('.counter__num').should('have.text', expectedCount.toString());
      };

      cy.get('@bunAddButton').click();
      checkCounter(`${selectors.ingredients.bun}:first`, '2');

      cy.get('@mainAddButton').click();
      checkCounter(`${selectors.ingredients.main}:eq(1)`, '1');
    });
  });

  context('Работа модальных окон', () => {
    it('открыть и закрыть модальный компонент', () => {
      cy.get('@ingredientDescription').click();
      cy.get(selectors.modal.content).should('exist');
      cy.get('#modals h3').should('contain.text', 'Краторная булка N-200i');

      // Закрытие модального окна
      cy.get('#modals button').click();
      cy.get(selectors.modal.content).should('not.exist');
    });

    it('закрыть модальное окно при нажатии на него', () => {
      cy.get('@ingredientDescription').click();
      cy.get(selectors.modal.overlay).click({ force: true });
      cy.get(selectors.modal.content).should('not.exist');
    });
  });

  context('Создание заказа', () => {
    it('создать и завершить заказ', () => {
      // Добавление ингредиентов
      cy.get('@bunAddButton').click();
      cy.get('@mainAddButton').click();
      cy.get('@sauceAddButton').click();

      // Оформление заказа
      cy.get(selectors.buttons.orderButton).click();
      cy.get(selectors.modal.content).should('exist');
      cy.get('#modals h2').should('contain.text', '87787');

      // Закрытие модального окна заказа
      cy.get('#modals button').click();
      cy.get(selectors.modal.content).should('not.exist');

      // Проверка очистки конструктора
      cy.get([
        selectors.constructor.topBun,
        selectors.constructor.bottomBun,
        selectors.constructor.main,
        selectors.constructor.sauce
      ].join(', ')).should('not.exist');
    });
  });
});