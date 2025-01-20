/*
declare global {
  namespace Cypress {
    interface Chainable {
      customCommand: typeof customCommand;
    }
  }
}
²
function customCommand(input: MyCustomClass) {
  // ...
}

Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/login');
  cy.get('input[formcontrolname="username"]').type('adminUser');
  cy.get('input[formcontrolname="password"]').type('adminPass123');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/admin');
});
*/
