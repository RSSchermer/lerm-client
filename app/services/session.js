import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  ajax: Ember.inject.service(),

  store: Ember.inject.service(),

  setCurrentUser: function () {
    this.authorize('authorizer:oauth2', (headerName, headerValue) => {
      const headers = {};
      headers[headerName] = headerValue;

      this.get('ajax').request('/current-user', {headers: headers}).then((data) => {
        Ember.run(() => {
          this.get('store').pushPayload(data);

          this.set('currentUser', this.get('store').peekRecord('currentUser', data.data.id));
        });
      });
    });
  }.observes('isAuthenticated').on('init')
});
