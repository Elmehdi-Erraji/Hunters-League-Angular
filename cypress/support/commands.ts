Cypress.Commands.add('loginByAPI', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8080/api/auth/login', // Your actual login endpoint
    body: {
      username: 'testadmin', // Use a dedicated test user
      password: 'testpassword'
    }
  }).then((response) => {
    // Store the token in local storage or as a cookie
    localStorage.setItem('authToken', response.body.token);
    // Optional: Set the token in request headers globally
    Cypress.on('window:before:load', (win) => {
      win.localStorage.setItem('authToken', response.body.token);
    });
  });
});
