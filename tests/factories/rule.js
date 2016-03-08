import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('rule', {
  default: {
    name: FactoryGuy.generate((i) => `Rule ${i}`),
    source: () => faker.lorem.words(),
    originalText: () => faker.lorem.sentence(),
    project: {}
  }
});
