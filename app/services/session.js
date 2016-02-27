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

      const promise = this.get('ajax').request('/oauth/token/info', {headers: headers}).then((tokenInfo) => {
        // TODO: find way to cleanly include memberships.project (see https://github.com/emberjs/data/pull/2584).
        return this.get('store').findRecord('user', tokenInfo['resource_owner_id']);
      });

      this.set('currentUser', DS.PromiseObject.create({promise: promise}));
    });
  }.observes('isAuthenticated').on('init')
});
