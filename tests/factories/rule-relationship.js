import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('rule-relationship', {
  default: {
    description: () => faker.lorem.sentence(),
    project: {},
    ruleOne: {},
    ruleTwo: {}
  }
});
