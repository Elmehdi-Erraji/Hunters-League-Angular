describe('Specie Create Component', () => {
  beforeEach(() => {
    // Login once before all tests
    cy.loginByAPI();
    cy.visit('/admin/species/create');
  });

  it('should render the form correctly', () => {
    cy.get('h2').should('contain', 'Create New Specie');
    cy.get('#name').should('exist');
    cy.get('#category').should('exist');
    cy.get('#minimumWeight').should('exist');
    cy.get('#difficulty').should('exist');
    cy.get('#points').should('exist');
  });

  it('should validate form fields', () => {
    // Test name validation
    cy.get('#name').type('AB').blur();
    cy.get('span').should('contain', 'min 3 characters');

    // Test required fields
    cy.get('button[type="submit"]').click();
    cy.get('span').should('contain', 'Name is required');
    cy.get('span').should('contain', 'Category is required');
  });

  it('should create a new specie successfully', () => {
    cy.get('#name').type('Test Specie');
    cy.get('#category').select('SEA');
    cy.get('#minimumWeight').type('50');
    cy.get('#difficulty').select('RARE');
    cy.get('#points').type('100');

    cy.get('button[type="submit"]').click();

    // Check for success message
    cy.contains('Specie created successfully!').should('be.visible');
  });

  it('should update an existing specie', () => {
    // First, create a specie to update
    cy.createTestSpecie().then((specieId) => {
      cy.visit(`/admin/species/edit/${specieId}`);

      cy.get('#name').clear().type('Updated Specie');
      cy.get('button[type="submit"]').click();

      cy.contains('Specie updated successfully!').should('be.visible');
    });
  });
});
