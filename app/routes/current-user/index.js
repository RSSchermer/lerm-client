import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'lerm-client/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let currentUser;

    // TODO: refactor when ember-simple-auth 1.2 is released with a promise based authorize API
    this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
      const headers = {};
      headers[headerName] = headerValue;
      const url = ENV.APP.SERVER_HOST + '/' + ENV.APP.API_NAMESPACE + '/current-user?include=memberships.project';

      currentUser = Ember.$.ajax(url, {headers: headers}).then((data) => {
        return Ember.run(() => {
          this.store.pushPayload(data);

          return this.store.peekRecord('currentUser', data.data.id);
        });
      });
    });

    return currentUser;
  }
});
