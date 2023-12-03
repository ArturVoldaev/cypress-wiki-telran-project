const createPage = Cypress.Commands.add("crudPattern", (body) => {
  let bodyReuest = {
    action: "edit",
    format: "json",
    token: body.token || "+\\",
  };

  switch (body.action) {
    case "edit":
      bodyReuest.title = body.title;
      bodyReuest.text = body.text;
      break;
    case "query":
      bodyReuest.action = "query";
      bodyReuest.titles = body.title;
      if (body.pageids) {
        bodyReuest.pageids = body.pageids;
      }
      break;
    case "delete":
      bodyReuest.action = "delete";
      bodyReuest.title = body.title;
      break;
    case "parse":
      bodyReuest.action = "parse";
      bodyReuest.title = body.title || null;
      bodyReuest.text = body.text || null;
      delete bodyReuest.token;
      if (body.page) {
        bodyReuest.page = body.title || null;
      }
      break;
    default:
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
