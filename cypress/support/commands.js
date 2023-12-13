require("/cypress/support/api-request/api-login-helper");
require("/cypress/support/api-request/api-request-action-helper");


Cypress.Commands.add("getMyIP", () => {
  cy.request("https://checkip.amazonaws.com/").then((res) => {
    return Cypress.env("myIP", res.body.replace(/[\r\n]/gm, ''));
  });
});

Cypress.Commands.add("visitMainPage", () => {
  cy.visit("/");
});

Cypress.Commands.add("redirectToPage", (pageName) => {
  pageName.click();
});
