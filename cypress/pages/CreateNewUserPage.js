class CreateNewUserPage {
    elements = {
      userNameInput: () => cy.get('#wpName2'),
      userPasswordInput: () => cy.get('#wpPassword2'),
      confirmPasswordInput: () => cy.get('#wpRetype'),
      userEmailInput: () => cy.get('#wpEmail'),
      userRealNameInput: () => cy.get('#wpRealName'),
      createNewAccountButton: () => cy.get('#wpCreateaccount'),
      userNameHeader: () => cy.get('#firstHeading'),
      errorBox: () => cy.get(".mw-message-box.mw-message-box-error")
    };
  
    createNewUser(login, password, confirmPassword, email, realName) {
        if (login) this.elements.userNameInput().type(login)
        if (password)this.elements.userPasswordInput().type(password)
        if (confirmPassword)this.elements.confirmPasswordInput().type(confirmPassword)
        if (email)this.elements.userEmailInput().type(email)
        if (realName)this.elements.userRealNameInput().type(realName)
        this.elements.createNewAccountButton().click() 
    }
  }
  
  module.exports = new CreateNewUserPage();