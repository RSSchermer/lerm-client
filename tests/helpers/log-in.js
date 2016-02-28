import Ember from 'ember';
import { authenticateSession } from 'lerm-client/tests/helpers/ember-simple-auth';

const { Test, run } = Ember;

export default Test.registerAsyncHelper('logIn',
  function(app, user) {
    user = user || server.create('user');
    server.create('accessToken', {resourceOwnerId: user.id});
    run(() => authenticateSession(app));
  }
);
