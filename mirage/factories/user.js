import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  email: (i) => `user${i}@example.com`,
  username: (i) => `user${i}`,
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName()
});
