import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('data-element', {
  default: {
    name: FactoryGuy.generate((i) => `Data Element ${i}`),
    description: () => faker.lorem.sentence(),
    project: {}
  }
});
