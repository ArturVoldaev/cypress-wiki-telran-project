/// <reference types="cypress" />
const user = require("../../fixtures/fakeData");


describe("API-Test", () => {
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
    console.log(`${user.pageTitle}`);
    //console.log(cy.rp(`${user.pageTitle}`, `${user.pageTitle}`));

    it("create-page-api-test ", () => {
        cy.createNewPage({
            title: `${user.pageTitle}`,
            text: 'Jane Lane',
          })
      });
  });

  context("NEGATIVE TEST", () => {
   
  });
});
