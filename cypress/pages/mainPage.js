class loginPage {
  elements = {
    searchInput: () => cy.get("#searchInput"),
    searchButton: () => cy.get("#searchButton"),
    editPageButton: () => cy.get('#ca-edit'),
    pageTitle:() => cy.get('.mw-page-title-main'),
    pageDescription:() =>cy.get('p')
  };

  searchPage(textForSearching) {
    this.elements.searchInput().type(textForSearching)
    this.elements.searchButton().click()
  }

  clickOnEditButton() {
    this.elements.editPageButton().click()
  }

  visitMainPage() {
    cy.visit("/");
  }
}

module.exports = new loginPage();


