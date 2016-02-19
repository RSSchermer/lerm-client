import Ember from 'ember';
import ENV from 'lerm-client/config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  },

  setCurrentUser: function () {
    this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
      const headers = {};
      headers[headerName] = headerValue;
      const url = ENV.APP.SERVER_HOST + '/' + ENV.APP.API_NAMESPACE + '/current-user';

      Ember.$.ajax(url, { headers: headers }).then((data) => {
        this.set('currentUser', this.get('store').push(data));
      });
    });
  }.observes('session.isAuthenticated').on('init')
});
