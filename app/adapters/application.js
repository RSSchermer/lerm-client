import DS from 'ember-data';
import AuthDataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'lerm-client/config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(AuthDataAdapterMixin, {
  host: ENV.APP.SERVER_HOST,
  namespace: ENV.APP.API_NAMESPACE,
  authorizer: 'authorizer:oauth2',

  // TODO: remove workaround when Ember Data supports eagerloading
  urlForFindRecord(id, modelName, snapshot) {
    let url = this._super(...arguments);
    let query = Ember.get(snapshot, 'adapterOptions.query');
    if (query) {
      url += '?' + Ember.$.param(query); // assumes no query params are present already
    }
    return url;
  }
});
