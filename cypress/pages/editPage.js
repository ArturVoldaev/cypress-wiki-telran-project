class editPage {
  elements = {
    saveButton: () => cy.get("#wpSave"),
    textBox: () => cy.get("#wpTextbox1"),
    summaryBox: () => cy.get("#wpSummary"),
  };

  inputText(mainText, summaryText) {
    if (mainText) {
      this.elements.textBox().type(mainText);
    }
    if (summaryText) {
      this.elements.summaryBox().type(summaryText);
    }
    this.submitEditPage();
  }

  submitEditPage() {
    this.elements.saveButton().click();
  }
}

module.exports = new editPage();
