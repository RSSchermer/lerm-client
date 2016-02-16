import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'lerm-client/config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: ENV.APP.SERVER_TOKEN_ENDPOINT
});
