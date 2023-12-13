/// <reference types="cypress" />
const user = require("../fixtures/api-tests-fake-data");

describe("PARSE, BLOCK, MOVE", () => {
  context("POSITIVE TESTS", () => {
    it("parse-page-positive-api-test", () => {
      cy.requestHelper({
        action: "parse",
        title: `${user.pageTitle}`,
        text: `${user.pageText}`,
      }).then((response) => {
        expect(response.body.parse.title).to.eq(`${user.pageTitle}`);
      });
    });

    it("block-user-positive-api-test ", () => {
      cy.requestHelper({
        action: "block",
        user: Cypress.env("LOGIN"),
      }).then((response) => {
        expect(response.body.error.code).to.eq("permissiondenied");
      });
    });

    it("move-page-positive-api-test ", () => {
      cy.logIn();
      cy.requestHelper({
        action: "query",
        meta: "tokens",
      }).then((response) => {
        Cypress.env("TOKEN", response.body.query.tokens.csrftoken);
      });

      cy.requestHelper({
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
      cy.requestHelper({
        action: "parse",
        title: `${user.pageTitle}`,
        text: `${user.pageText}`,
        page: `${user.pageTitle}`,
      }).then((response) => {
        expect(response.body.error.code).to.eq("invalidparammix");
      });
    });

    it("block-user-negative-api-test ", () => {
      cy.requestHelper({
        action: "block",
        user: Cypress.env("LOGIN"),
        token: "-",
      }).then((response) => {
        expect(response.body.error.code).to.eq("badtoken");
      });
    });

    it("move-page-negative-api-test ", () => {
      cy.logIn();
      cy.requestHelper({
        action: "query",
        meta: "tokens",
      });
      cy.requestHelper({
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
