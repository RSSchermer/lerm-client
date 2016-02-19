import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

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
