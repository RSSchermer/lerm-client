import SessionService from 'ember-simple-auth/services/session';
import Ember from 'ember';
import DS from 'ember-data';

export default SessionService.extend({
  ajax: Ember.inject.service(),

  store: Ember.inject.service(),

  setCurrentUser: function () {
    // TODO: refactor when ember-simple-auth 1.2 is released with a promise based authorize API
    this.authorize('authorizer:oauth2', (headerName, headerValue) => {
      const headers = {};
      headers[headerName] = headerValue;
      const url = '/current-user?include=memberships.project';

      const promise = this.get('ajax').request(url, {headers: headers}).then((data) => {
        return Ember.run(() => {
          this.get('store').pushPayload(data);

          return this.get('store').peekRecord('currentUser', data.data.id);
        });
      });

      this.set('currentUser', DS.PromiseObject.create({promise: promise}));
    });
  }.observes('isAuthenticated').on('init')
});
