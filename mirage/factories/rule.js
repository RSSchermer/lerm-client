import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  label: (i) => `Rule ${i}`,
  source: () => faker.lorem.word,
  originalText: () => faker.lorem.sentence
});
