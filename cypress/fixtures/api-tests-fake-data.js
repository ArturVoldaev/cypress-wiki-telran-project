const { faker } = require("@faker-js/faker");

module.exports = {
  pageTitle: faker.commerce.productName(),
  pageText: faker.lorem.paragraphs(3),
  newPageText: faker.lorem.paragraphs(8),
  newPageTitle:faker.date.anytime(),
  renameReason: faker.lorem.paragraphs(1),
  pageId: faker.number.int(),
  pageSummaru: faker.lorem.sentence(),
  fullName: faker.person.fullName(),
  phoneNumber: faker.phone.number(),
  indianSymbols: "एक जल्दी भूरी लोमड़ी आलसी कुत्ते पर कूदता" + faker.number.int(),
};
