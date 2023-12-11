const { faker, fakerZH_CN } = require("@faker-js/faker");

module.exports = {
  // registerNewUser:{
  //   login: test.login,
  //   password: faker.internet.password(),
  //   shortPassword: faker.internet.password({ length: 3 }),
  //   email: faker.internet.email(),
  //   realName: faker.person.firstName(),
  //   chinaSmybol: fakerZH_CN.animal.dog()
  // },
  pageTitle: faker.commerce.productName(),
  pageText: faker.lorem.paragraphs(3),
  newPageText: faker.lorem.paragraphs(8),
  newPageTitle:faker.date.anytime(),
  renameReason: faker.lorem.paragraphs(1),
  pageId: faker.number.int(),
  pageSummaru: faker.lorem.sentence(),
  fullName: faker.person.fullName(),
  phoneNumber: faker.phone.number(),
  indianSymbols: "एक जल्दी भूरी लोमड़ी आलसी कुत्ते पर कूदता",
};
