import Ember from 'ember';
import { authenticateSession } from 'lerm-client/tests/helpers/ember-simple-auth';

const { Test } = Ember;

export default Test.registerAsyncHelper('logIn',
  function(app, user) {
    let resourceOwner = user || server.create('user');
    let accessToken = server.create('accessToken', { resourceOwnerId: resourceOwner.id });

    authenticateSession(app, {
      'access_token': accessToken.accessToken,
      'token_type': accessToken.tokenType,
      'expires_in': accessToken.expiresIn,
      'created_at': accessToken.createdAt
    });

    wait();
  }
);
