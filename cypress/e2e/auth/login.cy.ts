// cypress/e2e/auth/login.cy.ts

describe('Login error cases', () => {
  beforeEach(() => {
    cy.visit('/login');
  })

  it('Shows error for invalid credentials 401 ', () => {
    cy.get('input[formcontrolname="username"]').type('wronguser');
    cy.get('input[formcontrolname="password"]').type('wronguser');

    cy.get('button[type="submit"]').click();

    cy.contains('Invalid username or password').should('be.visible');

    cy.wait(5000);

    cy.contains('Invalid username or password').should('not.exist');

  })

  it
})
