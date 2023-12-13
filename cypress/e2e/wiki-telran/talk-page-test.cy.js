/// <reference types="cypress" />

const mainPage = require("../../pages/MainPage");
const logInPage = require("../../pages/LogInPage");
const talkPage = require("../../pages/TalkPage");
const editPage = require("../../pages/EditPage");
const generateData = require("../../fixtures/ui-tests-fake-data");
const assertionsText = require("../../fixtures/assertions-text-data");

let newTextForTextBox, textForSummary, newSubject, newSubjectText;
beforeEach(() => {
  cy.visitMainPage();
  cy.redirectToPage(mainPage.elements.logInButton());
  logInPage.logInWithStandartUres(
    Cypress.env("LOGIN"),
    Cypress.env("PASSWORD")
  );
  cy.visitMainPage();
  cy.redirectToPage(mainPage.elements.talkButtonWithLoginUser());
  cy.getMyIP();
  newTextForTextBox = generateData.uiTest.newTextForTextBox();
  textForSummary = generateData.uiTest.textForSummary();
  newSubject = generateData.uiTest.newSubject();
  newSubjectText = generateData.uiTest.newSubjectText();
});

let { noSubjectError } = assertionsText.errorsText;

describe("talk-page-test.cy", () => {
  context("POSITIVE TEST", () => {
    it("show-standart-user-topics", () => {
      mainPage.elements
        .pageTitle()
        .should("contain.text", Cypress.env("LOGIN"));
    });
    it("show-unfamiliar-user-topics", () => {
        cy.wait(2000)
        cy.redirectToPage(mainPage.elements.logOutButton());
        cy.wait(2000)
        cy.visitMainPage();
        cy.redirectToPage(mainPage.elements.talkButton());
        mainPage.elements.pageTitle().should("contain.text", Cypress.env("myIP"));
      });
    it("create-new-talk-test", () => {
      talkPage.createNewTalk();
      editPage.inputText(newTextForTextBox, textForSummary, true);
      mainPage.elements
        .pageDescription()
        .should("contain.text", newTextForTextBox);
    });
    it("add-new-topic-talk-test", () => {
      talkPage.createNewTopic();
      editPage.inputText(newSubjectText, newSubject);
      mainPage.elements
        .containerContent()
        .should("contain.text", newSubjectText)
        .and("contain.text", newSubject);
    });
  });

  context("NEGATIVE TEST", () => {
    it("create-new-topic-talk-without-data-test", () => {
      talkPage.createNewTopic();
      editPage.inputText(undefined, undefined);
      editPage.elements
        .errorEmptuContent()
        .should("contain.text", noSubjectError);
    });
  });
});
