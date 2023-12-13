class MainPage {
  elements = {
    searchInput: () => cy.get("#searchInput"),
    searchButton: () => cy.get("#searchButton"),
    editPageButton: () => cy.get("#ca-edit"),
    pageTitle: () => cy.get(".mw-page-title-main"),
    pageDescription: () => cy.get("p"),
    createNewAccountHeaderButton: () => cy.get("#pt-createaccount"),
    userNameButton:() => cy.get("#pt-userpage"),
    talkButton: () => cy.get('#pt-anontalk'),
    talkButtonWithLoginUser: () => cy.get('#pt-mytalk'),
    logInButton:() => cy.get('#pt-login'),
    logOutButton:() => cy.get('#pt-logout'),
    containerContent:() => cy.get('#content')
  };

  searchPage(textForSearching) {
    this.elements.searchInput().type(textForSearching);
    this.elements.searchButton().click();
  }

}

module.exports = new MainPage();
