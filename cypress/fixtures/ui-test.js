const { faker, fakerZH_CN } = require("@faker-js/faker");

class GenerateData {
  uiTest = {
    newPageName: () => faker.commerce.product() + faker.number.int(),
    textForTextBox: () => faker.lorem.paragraphs(5),
    newTextForTextBox: () => faker.lorem.paragraphs(9),
    textForSummary: () => faker.lorem.sentence(),
    unknownLetter: () => fakerZH_CN.animal.dog(),
    sqlInjection: () => "Robert'); DROP TABLE "+`User${faker.number.int()}`+";--",
  };
}
module.exports = new GenerateData();
