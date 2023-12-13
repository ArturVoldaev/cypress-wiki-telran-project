/// <reference types="cypress" />
const user = require("../fixtures/fakeData");

describe("PARSE, BLOCK, MOVE", () => {
  context("POSITIVE TESTS", () => {
    it("parse-page-positive-api-test", () => {
      cy.crudPattern({
        action: "parse",
        title: `${user.pageTitle}`,
        text: `${user.pageText}`,
      }).then((response) => {
        expect(response.body.parse.title).to.eq(`${user.pageTitle}`);
      });
    });

    it("block-user-positive-api-test ", () => {
      cy.crudPattern({
        action: "block",
        user: Cypress.env("LOGIN"),
      }).then((response) => {
        expect(response.body.error.code).to.eq("permissiondenied");
      });
    });

    it("move-page-positive-api-test ", () => {
      cy.logIn();
      cy.crudPattern({
        action: "query",
        meta: "tokens",
      }).then((response) => {
        Cypress.env("TOKEN", response.body.query.tokens.csrftoken);
      });

      cy.crudPattern({
        action: "move",
        fromid: Cypress.env("pageID"),
        to: `${user.newPageTitle}`,
        reason: `${user.renameReason}`,
        token: Cypress.env("TOKEN"),
      }).then((response) => {
        expect(response.body.move.to).to.eq(`${user.newPageTitle}`);
        expect(response.body.move.reason).to.eq(`${user.renameReason}`);
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
        expect(response.body.error.code).to.eq("invalidparammix");
      });
    });

    it("block-user-negative-api-test ", () => {
      cy.crudPattern({
        action: "block",
        user: Cypress.env("LOGIN"),
        token: "-",
      }).then((response) => {
        expect(response.body.error.code).to.eq("badtoken");
      });
    });

    it("move-page-negative-api-test ", () => {
      cy.logIn();
      cy.crudPattern({
        action: "query",
        meta: "tokens",
      });
      cy.crudPattern({
        action: "move",
        fromid: Cypress.env("pageID"),
        to: `${user.newPageTitle}`,
        reason: `${user.renameReason}`,
        token: Cypress.env("TOKEN"),
      }).then((response) => {
        expect(response.body.error.code).to.eq("badtoken");
      });
    });
  });
});
