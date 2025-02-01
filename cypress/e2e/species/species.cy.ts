describe('Specie Create Component', () => {
  beforeEach(() => {
    // Login once before all tests
    cy.loginByAPI();
    cy.visit('/admin/species/create');
  });

  it('should render the form correctly', () => {
    // Check if the form title is correct
    cy.get('h2').should('contain', 'Create New Specie');

    // Check if all form fields are present
    cy.get('#name').should('exist');
    cy.get('#category').should('exist');
    cy.get('#minimumWeight').should('exist');
    cy.get('#difficulty').should('exist');
    cy.get('#points').should('exist');

    // Check if the submit button is present
    cy.get('button[type="submit"]').should('exist');
  });

  it('should validate form fields', () => {
    // Test name validation (min length)
    cy.get('#name').type('AB').blur();
    cy.contains('Name is required (min 3 characters).').should('be.visible');

    // Test required fields
    cy.get('button[type="submit"]').click();
    cy.contains('Name is required (min 3 characters).').should('be.visible');
    cy.contains('Category is required.').should('be.visible');
    cy.contains('Valid weight is required.').should('be.visible');
    cy.contains('Difficulty is required.').should('be.visible');
    cy.contains('Valid points are required.').should('be.visible');
  });

  it('should create a new specie successfully', () => {
    // Fill out the form
    cy.get('#name').type('Test Specie');
    cy.get('#category').select('SEA');
    cy.get('#minimumWeight').type('50');
    cy.get('#difficulty').select('RARE');
    cy.get('#points').type('100');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check for success message
    //cy.contains('Specie created successfully!').should('be.visible');

    // Verify redirection to the species list page
    cy.url().should('include', '/admin/species/list');
  });

  it('should display an error message if creation fails', () => {
    // Mock a failed API request
    cy.intercept('POST', '/api/species', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('createSpecieFail');

    // Fill out the form
    cy.get('#name').type('Test Specie');
    cy.get('#category').select('SEA');
    cy.get('#minimumWeight').type('50');
    cy.get('#difficulty').select('RARE');
    cy.get('#points').type('100');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check for error message
    cy.contains('Failed to create specie. Please try again.').should('be.visible');
  });


  it('should display an error message if update fails', () => {
    // Create a test specie to update
    cy.createTestSpecie().then((specieId) => {
      // Mock a failed API request
      cy.intercept('PUT', `/api/species/${specieId}`, {
        statusCode: 500,
        body: { message: 'Internal Server Error' },
      }).as('updateSpecieFail');

      // Visit the edit page
      cy.visit(`/admin/species/edit/${specieId}`);

      // Update the form fields
      cy.get('#name').clear().type('Updated Specie');
      cy.get('#minimumWeight').clear().type('60');
      cy.get('#difficulty').select('EPIC');
      cy.get('#points').clear().type('200');

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Check for error message
      cy.contains('Failed to update specie. Please try again.').should('be.visible');
    });
  });
});
