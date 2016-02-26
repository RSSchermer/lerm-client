import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `Project ${i}`;
  },

  description() {
    return faker.lorem.sentence;
  }
});
