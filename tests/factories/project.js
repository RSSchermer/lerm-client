import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('project', {
  default: {
    name: FactoryGuy.generate((i) => `Project ${i}`),
    description: () => faker.lorem.sentence()
  }
});
