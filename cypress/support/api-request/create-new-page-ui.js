const createNewPage = Cypress.Commands.add(
  "createNewPage",
  (newPageName, textForTextBox, textForSummary) => {
    cy.visit("/");
    if (newPageName) {
      cy.get(createNewPageSelectors.searchInput).type(newPageName);
      cy.get(createNewPageSelectors.searchButton).click();
      cy.get(createNewPageSelectors.createNewPageLink).click();
    }
    if (textForTextBox) {
      cy.get(createNewPageSelectors.textBox).type(textForTextBox);
    }
    if (textForTextBox) {
      cy.get(createNewPageSelectors.summaryInput).type(textForSummary);
    }
    clickOnSaveButton;
  }
);

exports.create = createNewPage;

const editPage = Cypress.Commands.add(
  "editPage",
  (newPageName, textForTextBox) => {
    cy.visit("/");
    cy.get(createNewPageSelectors.searchInput).type(newPageName);
    cy.get(createNewPageSelectors.searchButton).click();
    cy.get(createNewPageSelectors.editPageButton).click();
    cy.get(createNewPageSelectors.textBox).clear().type(textForTextBox);
    clickOnSaveButton;
  }
);

exports.create = editPage;

const clickOnSaveButton = Cypress.Commands.add("clickOnSaveButton", () => {
  cy.get(createNewPageSelectors.saveButton).click();
});
exports.create = clickOnSaveButton;

const createNewPageSelectors = {
  searchButton: "#searchButton",
  searchInput: "#searchInput",
  saveButton: "#wpSave",
  textBox: "#wpTextbox1",
  summaryInput: "#wpSummary",
  createNewPageLink: ".new",
  editPageButton: "#ca-edit",
  pageTitle: ".mw-page-title-main",
  checkText: "p",
};

Cypress.env("selectorsForTest", createNewPageSelectors);
