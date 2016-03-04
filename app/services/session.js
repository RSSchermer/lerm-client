import SessionService from 'ember-simple-auth/services/session';
import Ember from 'ember';
import DS from 'ember-data';

const { inject, computed } = Ember;
const { PromiseObject } = DS;

export default SessionService.extend({
  ajax: inject.service(),

  store: inject.service(),

  currentUser: computed('isAuthenticated', function() {
    // TODO: refactor when ember-simple-auth 1.2 is released with a promise based authorize API
    let promise;

    this.authorize('authorizer:oauth2', (headerName, headerValue) => {
      let headers = {};
      headers[headerName] = headerValue;

      promise = this.get('ajax').request('/oauth/token/info', { headers }).then((tokenInfo) => {
        return this.get('store').findRecord('user', tokenInfo['resource_owner_id'], { include: 'memberships.project' });
      });
    });

    if (promise) {
      return PromiseObject.create({ promise });
    } else {
      return null;
    }
  })
});
