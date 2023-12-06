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
      if (body.meta) {
        bodyReuest.meta = body.meta;
        delete bodyReuest.token;
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
    case "block":
      bodyReuest.action = "block";
      bodyReuest.user = body.user;
      break;
    case "move":
      bodyReuest.action = "move";
      bodyReuest.fromid = body.fromid;
      bodyReuest.to = body.to;
      bodyReuest.reason = body.reason;
      bodyReuest.token = Cypress.env("TOKEN")
      bodyReuest.redirectcreated  = false,
      bodyReuest.moveoverredirect = false
      break;
    default:
  }

  cy.request({
    method: "POST",
    form: true,
    url: Cypress.env("SEND_API"),
    body: bodyReuest,
  }).then((response) => {
    console.log(response);
    expect(response.status).to.eq(200);
    expect(response.duration).to.lessThan(Cypress.env("SPEED_RESPONSE"));
  });
});

exports.create = createPage;
