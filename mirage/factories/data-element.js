import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  label: (i) => `Data Element ${i}`,
  description: () => faker.lorem.sentence
});
