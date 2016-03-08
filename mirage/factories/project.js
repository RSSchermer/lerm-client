import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: (i) => `Project ${i}`,
  description: () => faker.lorem.sentence()
});
