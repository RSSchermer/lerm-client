import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  originalCondition: () => faker.lorem.sentence(),
  originalConsequence: () => faker.lorem.sentence(),
  cleanedCondition: () => faker.lorem.sentence(),
  cleanedConsequence: () => faker.lorem.sentence(),
  cleanedText: null,
  discarded: false
});
