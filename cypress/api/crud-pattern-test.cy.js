/// <reference types="cypress" />

const user = require("../fixtures/api-tests-fake-data");

describe("CRUD PATTERN TEST", () => {
  context("POSITIVE TESTS", () => {
    it("create-page-positive-api-test", () => {
      cy.requestHelper({
        action: "edit",
        title: `${user.pageTitle}`,
        text: `${user.pageText}`,
      }).then((response) => {
        expect(response.body.edit.title).to.eq(`${user.pageTitle}`);
        Cypress.env("pageID", response.body.edit.pageid);
      });
    });

    it("read-page-positive-api-test ", () => {
      cy.requestHelper({
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
      cy.requestHelper({
        action: "edit",
        title: `${user.pageTitle}`,
        text: `${user.pageText} ${user.newPageText}`,
      }).then((response) => {
        expect(response.body.edit.title).to.eq(`${user.pageTitle}`);
        expect(response.body.edit.result).to.eq("Success");
      });
    });

    it("delete-page-positive-api-test", () => {
      cy.requestHelper({
        action: "query",
        meta: "tokens",
        type: "login",
      }).then((response) => {
        Cypress.env("LOGIN_TOKEN", response.body.query.tokens.logintoken);
      });

      cy.requestHelper({
        action: "login",
        lgname: Cypress.env("LOGIN"),
        lgpassword: Cypress.env("PASSWORD"),
      }).then((response) => {
        expect(response.body.login.result).to.eq("Success");
      });

      cy.requestHelper({
        action: "query",
        meta: "tokens",
      }).then((response) => {
        Cypress.env("TOKEN", response.body.query.tokens.csrftoken);
      });

      cy.requestHelper({
        action: "delete",
        title: `${user.pageTitle}`,
      }).then((response) => {
        expect(response.body.error.code).to.eq("permissiondenied");
      });
    });
  });

  context("NEGATIVE TEST", () => {
    it("create-page-negative-api-test", () => {
      cy.requestHelper({
        action: "edit",
        title: null,
        text: null,
        token: null,
      }).then((response) => {
        expect(response.body.error.code).to.eq("invalidtitle");
      });
    });

    it("read-page-negative-api-test ", () => {
      cy.requestHelper({
        action: "query",
        title: `${user.indianSymbols}`,
        pageids: `${user.pageId}`,
      }).then((response) => {
        expect(response).to.have.property("status");
        expect(response.body.error.code).to.eq("multisource");
      });
    });

    it("update-page-negative-api-test ", () => {
      cy.requestHelper({
        action: "edit",
        title: `${user.pageTitle}`,
        text: `${user.pageText} ${user.newPageText}`,
        token: "-",
      }).then((response) => {
        expect(response.body.error.code).to.eq("badtoken");
        expect(response.body.error.info).to.eq("Invalid CSRF token.");
      });
    });

    it("delete-page-negative-api-test ", () => {
      cy.requestHelper({
        action: "delete",
      }).then((response) => {
        expect(response.body.error.code).to.eq("badtoken");
        expect(response.duration).to.be.lessThan(Cypress.env("SPEED_RESPONSE"));
      });
    });
  });
});
