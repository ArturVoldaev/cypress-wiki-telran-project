const registerNewUser = Cypress.Commands.add(
  "registerNewUser", (login=undefined, password=undefined,confirmPassword=undefined, email, realName) => {



    cy.visit("/");
    //cy.get('#pt-createaccount').click();
    if (login) {
      cy.get('#wpName2').type(login);
    }
    if (password) {
      cy.get('#wpPassword2').type(password);
    }
    if (confirmPassword) {
      cy.get('#wpRetype').type(confirmPassword);
    }
    if (email) {
      cy.get('#wpEmail').type(email);
    }
    cy.get('#wpRealName').type(realName);
    cy.get('#wpCreateaccount').click();
    //cy.wait(1000);
  }
);

exports.create = registerNewUser;
