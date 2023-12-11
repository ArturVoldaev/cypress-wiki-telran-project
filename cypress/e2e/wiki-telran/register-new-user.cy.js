/// <reference types="cypress" />

const { faker, fakerZH_CN } = require("@faker-js/faker");
const assertionHelper = require("../../support/assertionsHelper");

let login, password, email, realName, shortPassword, chinaSmybol;
beforeEach(() => {
  login = faker.person.firstName();
  password = faker.internet.password();
  shortPassword = faker.internet.password({ length: 3 });
  email = faker.internet.email();
  realName = faker.internet.email();
  chinaSmybol = fakerZH_CN.animal.dog();
});

let { shortPassowordError, commonPassordsError, emptyField, needValidUserName} =
  assertionHelper.errorsText;

describe("register-new-user", () => {
  context("POSITIVE TEST", () => {
    it("register-new-user-test", () => {
      cy.registerNewUser(login, password, password, email, realName);
      cy.get("#firstHeading").should("have.text", `Welcome, ${login}!`);
      cy.get("#pt-userpage").should("have.text", `${login}`);
    });
  });

  context("NEGATIVE TEST", () => {
    it("register-new-user-without-login-test", () => {
      cy.registerNewUser(undefined, password, password, email, realName);
      cy.get("#wpName2")
        .invoke("prop", "validationMessage")
        .should((text) => {
          expect(text).to.contain(emptyField);
        });
    });
    it("register-new-user-with-short-password-test", () => {
      cy.registerNewUser(login, shortPassword, shortPassword, email, realName);
      cy.get(".mw-message-box.mw-message-box-error").should(
        "include.text",
        shortPassowordError
      );
    });
    it("register-new-user-with-space-in-login-test", () => {
      cy.registerNewUser(" ", password, password, email, realName);
      cy.get(".mw-message-box-error").should(
        "include.text",
        needValidUserName
      );
    });
    it("register-new-user-china-name-test", () => {
      cy.registerNewUser(chinaSmybol, password, password, email, realName);
      cy.get("#firstHeading").should("have.text", `Welcome, ${chinaSmybol}!`);
      cy.get("#pt-userpage").should("have.text", `${chinaSmybol}`);
    });
  });
});
