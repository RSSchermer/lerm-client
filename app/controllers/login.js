import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, inject } = Ember;

export default Controller.extend({
  session: inject.service(),

  authenticateTask: task(function * () {
    let { identification, password } = this.getProperties('identification', 'password');

    try {
      yield this.get('session').authenticate('authenticator:oauth2', identification, password);
    } catch (reason) {
      if (reason.error === 'invalid_grant') {
        this.set('errorMessage', 'Invalid credentials');
      } else {
        this.set('errorMessage', reason.error || reason);
      }
    }
  }).drop()
});
