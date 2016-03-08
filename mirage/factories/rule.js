import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  label: (i) => `Rule ${i}`,
  source: () => faker.lorem.words(),
  originalText: () => faker.lorem.sentence()
});
