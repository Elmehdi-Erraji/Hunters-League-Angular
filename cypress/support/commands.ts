export {}; // This makes the file a module

declare global {
  namespace Cypress {
    interface Chainable {
      loginByAPI(): Chainable<void>;
      createTestSpecie(): Chainable<string>;
    }
  }
}

Cypress.Commands.add('loginByAPI', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8080/api/auth/login', // Use the correct login endpoint
    body: {
      username: 'admin', // Replace with valid credentials
      password: 'Password123',
    },
  }).then((response) => {
    // Store tokens and user data in localStorage
    window.localStorage.setItem('access_token', response.body.accessToken);
    window.localStorage.setItem('refresh_token', response.body.refreshToken);
    window.localStorage.setItem('role', response.body.role);
    window.localStorage.setItem('user_id', response.body.id);
  });
});

Cypress.Commands.add('createTestSpecie', () => {
  // Ensure the user is logged in and has a valid token
  const token = window.localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token found. Please log in first.');
  }

  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:8080/api/species/create', // Use the correct create endpoint
      body: {
        name: 'Test Specie',
        category: 'SEA',
        minimumWeight: 50,
        difficulty: 'RARE',
        points: 100,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      // Return the ID of the created specie
      return response.body.id;
    });
});
