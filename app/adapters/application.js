import DS from 'ember-data';
import AuthDataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'lerm-client/config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(AuthDataAdapterMixin, {
  host: ENV.APP.SERVER_HOST,
  namespace: ENV.APP.API_NAMESPACE,
  authorizer: 'authorizer:oauth2'
});
