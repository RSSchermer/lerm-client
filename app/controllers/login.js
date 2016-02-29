import Ember from 'ember';

const { Controller, inject } = Ember;

export default Controller.extend({
  session: inject.service(),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        if (reason.error === 'invalid_grant') {
          this.set('errorMessage', 'Invalid email/password');
        } else {
          this.set('errorMessage', reason.error || reason);
        }
      });
    }
  }
});
