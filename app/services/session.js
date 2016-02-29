import SessionService from 'ember-simple-auth/services/session';
import Ember from 'ember';
import DS from 'ember-data';

export default SessionService.extend({
  ajax: Ember.inject.service(),

  store: Ember.inject.service(),

  currentUser: Ember.computed('isAuthenticated', function() {
    // TODO: refactor when ember-simple-auth 1.2 is released with a promise based authorize API
    let promise;

    this.authorize('authorizer:oauth2', (headerName, headerValue) => {
      const headers = {};
      headers[headerName] = headerValue;

      promise = this.get('ajax').request('/oauth/token/info', {headers: headers}).then((tokenInfo) => {
        // TODO: find way to cleanly include memberships.project (see https://github.com/emberjs/data/pull/2584).
        return this.get('store').findRecord('user', tokenInfo['resource_owner_id']);
      });
    });

    if (promise) {
      return DS.PromiseObject.create({promise: promise});
    } else {
      return null;
    }
  })
});
