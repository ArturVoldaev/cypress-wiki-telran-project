/// <reference types="cypress" />

const user = require("../../fixtures/fakeData");

describe("API-Test", () => {
  // beforeEach(() => {
  //     cy.visit(Cypress.env("URL"))
  // cy.visit("http://wiki.telran-edu.de:8989/index.php/Main_Page")
  // cy.get('#pt-login').click()
  // cy.get('input[id="wpName1"]').type('PinTester')
  // cy.get('input[id="wpPassword1"]').type('PinTesterPinTester')
  // cy.get('#wpLoginAttempt').click()
  // cy.wait(5000)
  //   })
  context("POSITIVE TESTS", () => {
    it("create-page-api-test ", () => {
      cy.request({
        method: "POST",
        form: true,
        url: Cypress.env("URL") + Cypress.env("SEND_API"),
        body: {
          action: "edit",
          format: "json",
          title: `${user.pageTitle}`,
          text: `${user.pageText}`,
          token: "+\\",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.edit.title).to.eq(`${user.pageTitle}`);
        Cypress.env("pageID", response.body.edit.pageid);
      });
    });

    it("read-page-api-test ", () => {
      cy.request({
        method: "GET",
        url: Cypress.env("URL") + Cypress.env("SEND_API"),
        qs: {
          action: "query",
          format: "json",
          titles: `${user.pageTitle}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.query.pages[Cypress.env("pageID")].title).to.eq(
          `${user.pageTitle}`
        );
      });
    });

    it("update-page-api-test ", () => {
      cy.request({
        method: "POST",
        form: true,
        url: Cypress.env("URL") + Cypress.env("SEND_API"),
        body: {
          action: "edit",
          format: "json",
          title: `${user.pageTitle}`,
          text: `${user.pageText} ${user.newPageText}`,
          token: "+\\",
          formatversion: "latest",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.edit.title).to.eq(`${user.pageTitle}`);
        expect(response.body.edit.result).to.eq("Success");
      });
    });

    // it("delete-page-api-test ", () => {
    //   cy.request({
    //     method: "POST",
    //     form: true,
    //     url: "http://wiki.telran-edu.de:8989/api.php",
    //     body: {
    //       action: "delete",
    //       format: "json",
    //       title: "Investigator",
    //       token: "tuf4i7hehidshp9fhfnlrtql2qr9s9ue+\\",
    //       deleteglobalaccounttoken: "+\\",
    //       formatversion: "2",
    //     },
    //   }).then((res) => {
    //     cy.wait(1000);
    //     console.log(res);
    //   });
    // });
  });
  context("NEGATIVE TEST", () => {
    it("create-page-api-test ", () => {
      cy.request({
        method: "POST",
        form: true,
        url: Cypress.env("URL") + Cypress.env("SEND_API"),
        body: {
          action: "edit",
          format: "json",
          title: `${user.pageTitle}`,
          text: `${user.pageText}`,
          token: "+\\",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.edit.title).to.eq(`${user.pageTitle}`);
        Cypress.env("pageID", response.body.edit.pageid);
      });
    });

    it("read-page-api-test ", () => {
      cy.request({
        method: "GET",
        url: Cypress.env("URL") + Cypress.env("SEND_API"),
        qs: {
          action: "query",
          format: "json",
          titles: `${user.pageTitle}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.query.pages[Cypress.env("pageID")].title).to.eq(
          `${user.pageTitle}`
        );
      });
    });

    it("update-page-api-test ", () => {
      cy.request({
        method: "POST",
        form: true,
        url: Cypress.env("URL") + Cypress.env("SEND_API"),
        body: {
          action: "edit",
          format: "json",
          title: `${user.pageTitle}`,
          text: `${user.pageText} ${user.newPageText}`,
          token: "+\\",
          formatversion: "latest",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.edit.title).to.eq(`${user.pageTitle}`);
        expect(response.body.edit.result).to.eq("Success");
      });
    });

    // it("delete-page-api-test ", () => {
    //   cy.request({
    //     method: "POST",
    //     form: true,
    //     url: "http://wiki.telran-edu.de:8989/api.php",
    //     body: {
    //       action: "delete",
    //       format: "json",
    //       title: "Investigator",
    //       token: "tuf4i7hehidshp9fhfnlrtql2qr9s9ue+\\",
    //       deleteglobalaccounttoken: "+\\",
    //       formatversion: "2",
    //     },
    //   }).then((res) => {
    //     cy.wait(1000);
    //     console.log(res);
    //   });
    // });
  });
});
