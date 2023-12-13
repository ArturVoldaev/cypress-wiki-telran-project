/// <reference types="cypress" />

const generateData = require("../../fixtures/ui-tests-fake-data");
const mainPage = require("../../pages/MainPage");
const searchPage = require("../../pages/SearchResultPage");
const editPage = require("../../pages/EditPage");

let newPageName,
  textForTextBox,
  textForSummary,
  newTextForTextBox,
  sqlInjection,
  unknownLetter;

beforeEach(() => {
  cy.visitMainPage();
  newPageName = generateData.uiTest.newPageName();
  textForTextBox = generateData.uiTest.textForTextBox();
  newTextForTextBox = generateData.uiTest.newTextForTextBox();
  textForSummary = generateData.uiTest.textForSummary();
  unknownLetter = generateData.uiTest.unknownLetter();
  sqlInjection = generateData.uiTest.sqlInjection();
});

describe("create-new-page", () => {
  context("POSITIVE TEST", () => {
    it("create-new-page-test", () => {
      mainPage.searchPage(newPageName);
      cy.redirectToPage(searchPage.elements.createPageButton());
      editPage.inputText(textForTextBox, textForSummary);
      mainPage.elements.pageTitle().should("include.text", newPageName);
      cy.url().should("include", newPageName);
    });
    it("create-new-page-without-descripton-test", () => {
      mainPage.searchPage(newPageName);
      cy.redirectToPage(searchPage.elements.createPageButton());
      editPage.inputText(undefined, undefined);
      cy.redirectToPage(editPage.elements.saveButton())
      mainPage.elements.pageTitle().should("include.text", newPageName);
    });
    it("edit-page-test", () => {
      mainPage.searchPage(newPageName);
      cy.redirectToPage(searchPage.elements.createPageButton());
      editPage.inputText(textForTextBox, textForSummary);
      cy.redirectToPage(mainPage.elements.editPageButton());
      editPage.inputText(newTextForTextBox, undefined);
      mainPage.elements.pageTitle().should("include.text", newPageName);
      mainPage.elements
        .pageDescription()
        .should("include.text", newTextForTextBox);
    });
  });

  context("NEGATIVE TEST", () => {
    it("create-page-with-china-symbols-test", () => {
      mainPage.searchPage(unknownLetter);
      cy.redirectToPage(searchPage.elements.createPageButton());
      editPage.inputText(textForTextBox, textForSummary);
      mainPage.elements.pageTitle().should("include.text", unknownLetter);
    });
    it("create-page-with-sql-injection-data-test", () => {
      mainPage.searchPage(sqlInjection);
      cy.redirectToPage(searchPage.elements.createPageButton());
      editPage.inputText(textForTextBox, textForSummary);
      mainPage.elements.pageTitle().should("include.text", sqlInjection);
    });
  });
});
