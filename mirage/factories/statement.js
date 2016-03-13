import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  condition: () => faker.lorem.sentence(),
  consequence: () => faker.lorem.sentence(),
  cleanedCondition: () => faker.lorem.sentence(),
  cleanedConsequence: () => faker.lorem.sentence(),
  cleanedText: null,
  discarded: false
});
