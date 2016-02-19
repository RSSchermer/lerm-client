import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'lerm-client/config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let currentUser;

    this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
      const headers = {};
      headers[headerName] = headerValue;
      const url = ENV.APP.SERVER_HOST + '/' + ENV.APP.API_NAMESPACE + '/current-user?include=memberships.project';

      currentUser = Ember.$.ajax(url, { headers: headers }).then((data) => {
        this.store.pushPayload(data);

        return this.store.findRecord('user', data.data.id);
      });
    });

    return currentUser;
  }
});
