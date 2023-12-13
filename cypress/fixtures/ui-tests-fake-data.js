const { faker, fakerZH_CN } = require("@faker-js/faker");

class GenerateData {
  uiTest = {
    newPageName: () => faker.commerce.product() + faker.number.int(),
    textForTextBox: () => faker.lorem.paragraphs(5),
    newTextForTextBox: () => faker.lorem.paragraphs(9),
    textForSummary: () => faker.lorem.sentence(),
    unknownLetter: () => fakerZH_CN.animal.dog()+faker.number.int(),
    sqlInjection: () => "Robert'); DROP TABLE "+`User${faker.number.int()}`+";--",
    loginNameNewUser: () => faker.person.firstName() + faker.number.int(),
    passwordNewUser: () => faker.internet.password(),
    shortPassword: () => faker.internet.password({ length: 3 }),
    email: () => faker.internet.email(),
    realName: () =>faker.person.firstName(),
    newSubject: () => faker.location.city()+faker.number.int(),
    newSubjectText: () => faker.git.commitMessage()+faker.number.int(),
  };
}
module.exports = new GenerateData();
