describe('login - invalid credentials (real backend)', () => {
  it('should display an error message when returns 401', () => {
    cy.visit('/login');

    cy.get('input[formcontrolname="username"]').type('wrongUser');
    cy.get('input[formcontrolname="password"]').type('wrongPassword');

    cy.get('button[type="submit"]').click();

    cy.contains('Invalid username or password').should('be.visible');

    cy.wait(5000);
    cy.contains('Invalid username or password').should('not.exist');
  })
})
