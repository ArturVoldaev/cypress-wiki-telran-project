/// <reference types="cypress" />

const generateData = require("../../fixtures/ui-test");
const mainPage = require("../../pages/mainPage");
const searchPage = require("../../pages/searchResultPage");
const editPage = require("../../pages/editPage");

let newPageName,
  textForTextBox,
  textForSummary,
  newTextForTextBox,
  sqlInjection,
  unknownLetter;

beforeEach(() => {
  mainPage.visitMainPage();
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
      searchPage.clickOnButtonCreatePage();
      editPage.inputText(textForTextBox, textForSummary);
      mainPage.elements.pageTitle().should("include.text", newPageName);
      cy.url().should("include", newPageName);
    });
    it("create-new-page-without-descripton-test", () => {
      mainPage.searchPage(newPageName);
      searchPage.clickOnButtonCreatePage();
      editPage.inputText(undefined, undefined);
      editPage.submitEditPage();
      mainPage.elements.pageTitle().should("include.text", newPageName);
    });
    it("edit-page-test", () => {
      mainPage.searchPage(newPageName);
      searchPage.clickOnButtonCreatePage();
      editPage.inputText(textForTextBox, textForSummary);
      mainPage.clickOnEditButton();
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
      searchPage.clickOnButtonCreatePage();
      editPage.inputText(textForTextBox, textForSummary);
      mainPage.elements.pageTitle().should("include.text", unknownLetter);
    });
    it("create-page-with-sql-injection-data-test", () => {
      mainPage.searchPage(sqlInjection);
      searchPage.clickOnButtonCreatePage();
      editPage.inputText(textForTextBox, textForSummary);
      mainPage.elements.pageTitle().should("include.text", sqlInjection);
    });
  });
});
