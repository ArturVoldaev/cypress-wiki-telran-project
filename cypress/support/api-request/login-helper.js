const login = Cypress.Commands.add("login", (login=Cypress.env("LOGIN"), password=Cypress.env("PASSWORD")) => {
  cy.visit("/");
  cy.get("#pt-login").click();
  cy.get('input[id="wpName1"]').type(login);
  cy.get('input[id="wpPassword1"]').type(password);
  cy.get("#wpLoginAttempt").click();
  cy.wait(3000);
});

exports.create = login;
