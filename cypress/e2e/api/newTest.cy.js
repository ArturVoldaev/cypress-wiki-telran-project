/// <reference types="cypress" />
const user = require("../../fixtures/fakeData");

describe("PARSE, ", () => {
  // beforeEach(() => {
  //     cy.visit(Cypress.env("URL"))
  // cy.visit("http://wiki.telran-edu.de:8989/index.php/Main_Page")
  // cy.get('#pt-login').click()
  // cy.get('input[id="wpName1"]').type('PinTester')
  // cy.get('input[id="wpPassword1"]').type('PinTesterPinTester')
  // cy.get('#wpLoginAttempt').click()
  // cy.wait(5000)
  //   })
  context("POSITIVE TESTS", () => {
    it("parse-page-positive-api-test", () => {
      cy.crudPattern({
        action: "parse",
        title: `${user.pageTitle}`,
        text: `${user.pageText}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.parse.title).to.eq(`${user.pageTitle}`);
      });
    });
  });

  context("NEGATIVE TEST", () => {
    it("parse-page-negative-api-test", () => {
      cy.crudPattern({
        action: "parse",
        title: `${user.pageTitle}`,
        text: `${user.pageText}`,
        page: `${user.pageTitle}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.error.code).to.eq("invalidparammix");
      });
    });
  });
});
