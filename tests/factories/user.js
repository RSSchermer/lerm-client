import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('user', {
  default: {
    email: FactoryGuy.generate((i) => `user_${i}@example.com`),
    username: FactoryGuy.generate((i) => `user_${i}`),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName()
  }
});
