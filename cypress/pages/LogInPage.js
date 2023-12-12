class LogInPage {
    elements = {
      userNameInput: () => cy.get('#wpName1'),
      userPasswordInput: () => cy.get('#wpPassword1'),
      logInButton: () => cy.get('#wpLoginAttempt'),

    };
  
    logInWithStandartUres(login, password) {
        if (login) this.elements.userNameInput().type(login)
        if (password)this.elements.userPasswordInput().type(password)
        this.elements.logInButton().click()
    }
  }
  
  module.exports = new LogInPage();