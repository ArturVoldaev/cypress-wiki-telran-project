// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require("/cypress/support/api-request/create-page");
require("/cypress/support/api-request/login-helper");
require("/cypress/support/api-request/registerNewUser");
require("/cypress/support/api-request/create-new-page-ui");

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
