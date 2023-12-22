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

    it("logIn-positive-api-test ", () => {
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
        expect(response.body.login.lgusername).to.eq(Cypress.env("LOGIN"));
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

    it("logIn-negative-api-test ", () => {
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
      }).then((response) => {
        expect(response.body.login.result).to.eq("Failed");
      });
    });
  });
});
