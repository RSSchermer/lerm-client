import Ember from 'ember';
import ENV from 'lerm-client/config/environment';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  session: Ember.inject.service('session'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
      this.transitionToRoute('login');
    }
  },

  setCurrentUser: function () {
    this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
      const headers = {};
      headers[headerName] = headerValue;

      this.get('ajax').request('/current-user', {headers: headers}).then((data) => {
        Ember.run(() => {
          this.store.pushPayload(data);

          this.set('currentUser', this.store.peekRecord('currentUser', data.data.id));
        });
      });
    });
  }.observes('session.isAuthenticated').on('init')
});
