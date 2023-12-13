const login = Cypress.Commands.add("logIn", (login=Cypress.env("LOGIN"), password=Cypress.env("PASSWORD")) => {
  cy.visit("/");
  cy.get("#pt-login").click();
  cy.get('input[id="wpName1"]').type(login);
  cy.get('input[id="wpPassword1"]').type(password);
  cy.get("#wpLoginAttempt").click();
  cy.wait(2000);
});

exports.create = login;
