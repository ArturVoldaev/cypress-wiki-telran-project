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

    it("read-page-api-test ", () => {
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

    it("update-page-api-test ", () => {
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

    it("delete-page-api-test ", () => {
      cy.crudPattern({
        action: "delete",
        title: `${user.pageTitle}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.statusText).to.eq("OK");
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

    it("parse-page-positive-api-test", () => {
      cy.request({
        method: "POST",
        form: true,
        url: Cypress.env("SEND_API"),
        body: {
          action: "parse",
          format: "json",
          title: `${user.pageTitle}`,
          text: `${user.pageText}`,
          formatversion: "2",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.parse.title).to.eq(`${user.pageTitle}`);
      });
    });
  });

  context("NEGATIVE TEST", () => {
    it("create-page-negative-api-test ", () => {
      cy.crudPattern({
        action: "edit",
        title: '',
        text: '',
        token: null
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.error.code).to.eq('invalidtitle');
      });
    });

    it("read-page-api-test ", () => {
      cy.request({
        method: "GET",
        url: Cypress.env("SEND_API"),
        qs: {
          action: "query",
          format: "json",
          titles: `${user.pageTitle}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.query.pages[Cypress.env("pageID")].title).to.eq(
          `${user.pageTitle}`
        );
      });
    });

    it("update-page-api-test ", () => {
      cy.request({
        method: "POST",
        form: true,
        url: Cypress.env("SEND_API"),
        body: {
          action: "edit",
          format: "json",
          title: `${user.pageTitle}`,
          text: `${user.pageText} ${user.newPageText}`,
          token: "+\\",
          formatversion: "latest",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.edit.title).to.eq(`${user.pageTitle}`);
        expect(response.body.edit.result).to.eq("Success");
      });
    });

    it("delete-page-api-test ", () => {
      cy.request({
        method: "POST",
        form: true,
        url: Cypress.env("SEND_API"),
        body: {
          action: "delete",
          format: "json",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.error.code).to.eq("missingparam");
        expect(response.duration).to.be.lessThan(Cypress.env("SPEED_RESPONSE"));
      });
    });

    it("parse-page-negative-api-test", () => {
      cy.request({
        method: "POST",
        form: true,
        url: Cypress.env("SEND_API"),
        body: {
          action: "parse",
          format: "json",
          title: `${user.pageTitle}`,
          text: `${user.pageText}`,
          page: `${user.pageTitle}`,
          formatversion: "2",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.error.code).to.eq("invalidparammix");
      });
    });
  });
});
