/// <reference types="cypress" />

const user = require("../../fixtures/fakeData");

describe("CRUD PATTERN TEST", () => {
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
    it("create-page-positive-api-test ", () => {
      cy.crudPattern({
        action: "edit",
        title: `${user.pageTitle}`,
        text: `${user.pageText}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.edit.title).to.eq(`${user.pageTitle}`);
        Cypress.env("pageID", response.body.edit.pageid);
      });
    });

    it("read-page-positive-api-test ", () => {
      cy.crudPattern({
        action: "query",
        title: `${user.pageTitle}`,
      }).then((response) => {
        expect(response).to.have.property("status");
        expect(response.status).to.eq(200);
        expect(response.body.query.pages[Cypress.env("pageID")].title).to.eq(
          `${user.pageTitle}`
        );
      });
    });

    it("update-page-positive-api-test ", () => {
      cy.crudPattern({
        action: "edit",
        title: `${user.pageTitle}`,
        text: `${user.pageText} ${user.newPageText}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.edit.title).to.eq(`${user.pageTitle}`);
        expect(response.body.edit.result).to.eq("Success");
      });
    });

    it("delete-page-positive-api-test ", () => {
      cy.crudPattern({
        action: "delete",
        title: `${user.pageTitle}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.error).to.have.property('info')
        expect(response.duration).to.be.lessThan(Cypress.env("SPEED_RESPONSE"));
      });
    });

    it("block-user-api-test ", () => {
      cy.request({
        method: "POST",
        form: true,
        url: Cypress.env("SEND_API"),
        body: {
          action: "block",
          format: "json",
          user: Cypress.env("LOGIN"),
          token: "+\\",
          formatversion: "2",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.error.code).to.eq("permissiondenied");
      });
    });


  });

  context("NEGATIVE TEST", () => {
    it("create-page-negative-api-test ", () => {
      cy.crudPattern({
        action: "edit",
        title: null,
        text: null,
        token: null,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.error.code).to.eq("invalidtitle");
      });
    });

    it("read-page-negative-api-test ", () => {
      cy.crudPattern({
        action: "query",
        title: `${user.indianSymbols}`,
        pageids: `${user.pageId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response).to.have.property("status");
        expect(response.body.error.code).to.eq("multisource");
      });
    });

    it("update-page-negative-api-test ", () => {
      cy.crudPattern({
        action: "edit",
        title: `${user.pageTitle}`,
        text: `${user.pageText} ${user.newPageText}`,
        token: "-",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.error.code).to.eq("badtoken");
        expect(response.body.error.info).to.eq("Invalid CSRF token.");
      });
    });

    it("delete-page-negative-api-test ", () => {
      cy.crudPattern({
        action: "delete",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.error.code).to.eq("missingparam");
        expect(response.duration).to.be.lessThan(Cypress.env("SPEED_RESPONSE"));
      });
    });


  });
});
