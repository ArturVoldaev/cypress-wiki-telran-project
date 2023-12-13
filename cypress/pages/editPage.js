class EditPage {
  elements = {
    saveButton: () => cy.get("#wpSave"),
    textBox: () => cy.get("#wpTextbox1"),
    summaryBox: () => cy.get("#wpSummary"),
    errorEmptuContent: () => cy.get("#mw-missingcommenttext"),
  };

  inputText(mainText, summaryText, clearTextBox = false) {
    if (clearTextBox) {
      this.elements.textBox().clear();
    }
    if (mainText) {
      this.elements.textBox().type(mainText);
    }
    if (summaryText) {
      this.elements.summaryBox().type(summaryText);
    }
    cy.redirectToPage(this.elements.saveButton())
  }
}

module.exports = new EditPage();
