import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  email(i) {
    return `user${i}@example.com`;
  },
  username(i) {
    return `user${i}`;
  },
  firstName() {
    return faker.name.firstName();
  },
  lastName() {
    return faker.name.lastName();
  }
});
