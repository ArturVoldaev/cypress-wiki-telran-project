class TalkPage {
  elements = {
    userName: () => cy.get(".mw-page-title-main"),
    createTalkButton: () => cy.get("#ca-edit"),
    addTopic: () => cy.get("#ca-addsection"),
    
  };

  createNewTalk() {
    this.elements.createTalkButton().click();
  }

  createNewTopic() {
    this.elements.addTopic().click();
  }
}

module.exports = new TalkPage();
