//Network intercepting

describe('Login - invalid credentials', () => {

  beforeEach(() => {
    cy.visit('/login');
  })

  it('should display an error when backend return 401', () => {
    cy.intercept('POST', '/api/auth/login',{
      statusCode: 401,
      body: {message: 'Invalid credentials'},
    } ).as('loginRequest');

    cy.get('input[formcontrolname="username"]').type('wronguser');
    cy.get('input[formcontrolname="password"]').type('wronguser');

    cy.get('button[type="submit"]').click();

    cy.contains('Invalid username or password').should('be.visible');

  })


})
