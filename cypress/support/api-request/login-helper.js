const login = Cypress.Commands.add("login", (body) => {
  cy.visit("/");
  cy.get("#pt-login").click();
  cy.get('input[id="wpName1"]').type(Cypress.env("LOGIN"));
  cy.get('input[id="wpPassword1"]').type(Cypress.env("PASSWORD"));
  cy.get("#wpLoginAttempt").click();
  cy.wait(3000);
});

exports.create = login;
