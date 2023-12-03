const createPage = Cypress.Commands.add("crudPattern", (body) => {
  let bodyReuest = {
    action: "edit",
    format: "json",
    token: body.token || "+\\",
  };

  if (body.action == "edit") {
    bodyReuest.title = body.title;
    bodyReuest.text = body.text;
  }

  if (body.action == "query") {
    bodyReuest.action = "query";
    bodyReuest.titles = body.title;
  }

  if (body.action == "delete") {
    bodyReuest.action = "delete";
    bodyReuest.titles = body.title;
  }

  cy.request({
    method: "POST",
    form: true,
    url: Cypress.env("SEND_API"),
    body: bodyReuest,
  }).then((responce) => {
    console.log(responce);
  });
});

exports.create = createPage;
