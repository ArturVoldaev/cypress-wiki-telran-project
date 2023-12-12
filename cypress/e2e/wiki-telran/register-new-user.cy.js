/// <reference types="cypress" />

const mainPage = require("../../pages/mainPage");
const assertionsText = require("../../fixtures/assertionsText");
const generateData = require("../../fixtures/ui-test");
const createNewUserPage = require("../../pages/createNewUserPage");

let login, password, email, realName, shortPassword, chinaSmybol;
beforeEach(() => {
  mainPage.visitMainPage();
  mainPage.clickOnCreateAccountButton();
  login = generateData.uiTest.loginNameNewUser();
  password = generateData.uiTest.passwordNewUser();
  shortPassword = generateData.uiTest.shortPassword();
  email = generateData.uiTest.email();
  realName = generateData.uiTest.realName();
  chinaSmybol = generateData.uiTest.unknownLetter();
});

let {
  shortPassowordError,
  emptyField,
  needValidUserName,
} = assertionsText.errorsText;

describe("register-new-user", () => {
  context("POSITIVE TEST", () => {
    it("register-new-user-test", () => {
      createNewUserPage.createNewUser(
        login,
        password,
        password,
        email,
        realName
      );
      createNewUserPage.elements
        .userNameHeader()
        .should("have.text", `Welcome, ${login}!`);
      mainPage.elements.userNameButton().should("have.text", `${login}`);
    });
  });

  context("NEGATIVE TEST", () => {
    it("register-new-user-without-login-test", () => {
      createNewUserPage.createNewUser(
        undefined,
        password,
        password,
        email,
        realName
      );
      createNewUserPage.elements
        .userNameInput()
        .invoke("prop", "validationMessage")
        .should((text) => {
          expect(text).to.contain(emptyField);
        });
    });
    it("register-new-user-with-short-password-test", () => {
      createNewUserPage.createNewUser(
        login,
        shortPassword,
        shortPassword,
        email,
        realName
      );
      createNewUserPage.elements
        .errorBox()
        .should("include.text", shortPassowordError);
    });
    it("register-new-user-with-space-in-login-test", () => {
      createNewUserPage.createNewUser(" ", password, password, email, realName);
      createNewUserPage.elements
        .errorBox()
        .should("include.text", needValidUserName);
    });
    it("register-new-user-china-name-test", () => {
      createNewUserPage.createNewUser(chinaSmybol, password, password, email, realName);
      createNewUserPage.elements.userNameHeader().should("have.text", `Welcome, ${chinaSmybol}!`);
      mainPage.elements.userNameButton().should("have.text", `${chinaSmybol}`);
    });
  });
});
