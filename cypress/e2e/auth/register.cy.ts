// cypress/e2e/auth/register.cy.ts

describe('User Registration', () => {

  beforeEach(() => {
    // Visit the register page before each test
    cy.visit('/register');
  });

  // ========== 1. SUCCESSFUL REGISTRATION ==========
  it('should register successfully with valid inputs', () => {
    // (A) Optional: mock a successful backend response
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
      body: { message: 'Registered successfully' },
    }).as('registerRequest');

    cy.get('input[formcontrolname="username"]').type('validUser');
    cy.get('input[formcontrolname="password"]').type('validPass123');
    cy.get('input[formcontrolname="firstName"]').type('John');
    cy.get('input[formcontrolname="lastName"]').type('Doe');
    cy.get('input[formcontrolname="cin"]').type('AB123456');  // pattern: ^[A-Z]{2}[0-9]{6}$
    cy.get('input[formcontrolname="email"]').type('john.doe@example.com');
    cy.get('input[formcontrolname="nationality"]').type('American');

    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest');

    cy.contains('Registration Successful!').should('be.visible');

    cy.wait(3000);
    cy.url().should('include', '/login');
  });

  // ========== 2. FORM VALIDATION ERRORS ==========

  it('should show error if username is too short', () => {
    cy.get('input[formcontrolname="username"]').type('ab'); // minLength = 3
    cy.get('input[formcontrolname="password"]').type('validPass123');
    cy.get('input[formcontrolname="firstName"]').type('John');
    cy.get('input[formcontrolname="lastName"]').type('Doe');
    cy.get('input[formcontrolname="cin"]').type('AB123456');
    cy.get('input[formcontrolname="email"]').type('john.doe@example.com');
    cy.get('input[formcontrolname="nationality"]').type('American');

    cy.get('button[type="submit"]').click();

    cy.contains('Please fill all fields correctly.').should('be.visible');

    cy.wait(5000);
    cy.contains('Please fill all fields correctly.').should('not.exist');
  });

  it('should show error if password is too short', () => {
    cy.get('input[formcontrolname="username"]').type('validUser');
    cy.get('input[formcontrolname="password"]').type('12345'); // minLength = 6
    cy.get('input[formcontrolname="firstName"]').type('John');
    cy.get('input[formcontrolname="lastName"]').type('Doe');
    cy.get('input[formcontrolname="cin"]').type('AB123456');
    cy.get('input[formcontrolname="email"]').type('john.doe@example.com');
    cy.get('input[formcontrolname="nationality"]').type('American');

    cy.get('button[type="submit"]').click();

    cy.contains('Please fill all fields correctly.').should('be.visible');
  });

  it('should show error if CIN does not match pattern', () => {
    cy.get('input[formcontrolname="username"]').type('validUser');
    cy.get('input[formcontrolname="password"]').type('validPass123');
    cy.get('input[formcontrolname="firstName"]').type('John');
    cy.get('input[formcontrolname="lastName"]').type('Doe');
    cy.get('input[formcontrolname="cin"]').type('AAA12345'); // pattern is ^[A-Z]{2}[0-9]{6}$, so "AAA" is invalid
    cy.get('input[formcontrolname="email"]').type('john.doe@example.com');
    cy.get('input[formcontrolname="nationality"]').type('American');

    cy.get('button[type="submit"]').click();

    cy.contains('Please fill all fields correctly.').should('be.visible');
  });

  it('should show error if email is invalid', () => {
    cy.get('input[formcontrolname="username"]').type('validUser');
    cy.get('input[formcontrolname="password"]').type('validPass123');
    cy.get('input[formcontrolname="firstName"]').type('John');
    cy.get('input[formcontrolname="lastName"]').type('Doe');
    cy.get('input[formcontrolname="cin"]').type('AB123456');
    cy.get('input[formcontrolname="email"]').type('wrong-email'); // invalid
    cy.get('input[formcontrolname="nationality"]').type('American');

    cy.get('button[type="submit"]').click();

    cy.contains('Please fill all fields correctly.').should('be.visible');
  });

  it('should show error if nationality has numbers', () => {
    cy.get('input[formcontrolname="username"]').type('validUser');
    cy.get('input[formcontrolname="password"]').type('validPass123');
    cy.get('input[formcontrolname="firstName"]').type('John');
    cy.get('input[formcontrolname="lastName"]').type('Doe');
    cy.get('input[formcontrolname="cin"]').type('AB123456');
    cy.get('input[formcontrolname="email"]').type('john.doe@example.com');
    cy.get('input[formcontrolname="nationality"]').type('Amer1can'); // pattern ^[A-Za-z]+$

    cy.get('button[type="submit"]').click();
    cy.contains('Please fill all fields correctly.').should('be.visible');
  });

  // ========== 3. SERVER-SIDE ERROR SCENARIO ==========
  it('should display error message if server responds with an error', () => {
    // Mock a 500 response from the backend
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 500,
      body: { message: 'Server error' },
    }).as('registerRequest');

    cy.get('input[formcontrolname="username"]').type('validUser');
    cy.get('input[formcontrolname="password"]').type('validPass123');
    cy.get('input[formcontrolname="firstName"]').type('John');
    cy.get('input[formcontrolname="lastName"]').type('Doe');
    cy.get('input[formcontrolname="cin"]').type('AB123456');
    cy.get('input[formcontrolname="email"]').type('john.doe@example.com');
    cy.get('input[formcontrolname="nationality"]').type('American');

    // Submit
    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');


    cy.contains('Server error').should('be.visible');


  });

});
