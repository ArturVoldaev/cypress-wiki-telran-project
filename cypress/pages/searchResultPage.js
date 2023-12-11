class searchResultPage {
    elements = {
      createPageButton: () => cy.get('.new'),
    };
  
    clickOnButtonCreatePage() {
      this.elements.createPageButton().click()
    }
  }
  
  module.exports = new searchResultPage();