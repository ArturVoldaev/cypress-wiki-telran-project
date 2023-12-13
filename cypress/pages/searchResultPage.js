class SearchResultPage {
    elements = {
      createPageButton: () => cy.get('.new'),
    };
  }
  
  module.exports = new SearchResultPage();