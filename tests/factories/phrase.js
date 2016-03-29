import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('phrase', {
  default: {
    originalText: () => faker.lorem.words(),
    cleanedText: () => faker.lorem.words(),
    discarded: false,
    crisp: true,
    dataElementExpression: () => faker.lorem.sentence(),
    rule: {}
  }
});
