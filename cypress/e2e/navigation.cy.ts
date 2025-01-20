describe('Admin Dashboard Navigation', () => {
  beforeEach(() => {
    // 1. Log in manually
    cy.visit('/login');
    cy.document().then((doc) => {
      doc.body.classList.add('cypress-test'); // Disable animations
    });

    cy.get('input[formcontrolname="username"]').type('admin');
    cy.get('input[formcontrolname="password"]').type('Password123');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/admin');
  });

  it('should navigate to Species List from the dashboard', () => {
    cy.contains('div', 'Species').click();

    cy.url().should('include', '/admin/species/list');
    cy.contains('Species List').should('be.visible');
  });
});
