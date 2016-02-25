import Mirage from 'ember-cli-mirage';
import qs from 'npm:qs';

export default function() {
  this.urlPrefix = '';

  // Auth routes

  this.post('/oauth/token', (schema, request) => {
    const params = qs.parse(request.requestBody);

    if (params.grant_type === 'password' &&
        params.password === 'valid_password') {
      schema.currentUser.create({
        email: params.username,
        username: 'current_user',
        firstName: 'Current',
        lastName: 'User'
      });

      return {
        access_token: '824228db73ee5cc495af0716c644374b308c94dc71dff13ed3d8419a7bca1eeb',
        token_type: 'bearer',
        expires_in: 7200,
        created_at: 1456307186
      };
    } else {
      return new Mirage.Response(401, {}, {error: 'invalid_grant'});
    }
  });

  // API routes

  this.namespace = 'api/v1';

  // Returns the most recently created current user.
  this.get('current-user', (schema) => {
    const currentUsers = schema.currentUser.all();

    if (currentUsers.length > 0) {
      return currentUsers[currentUsers.length - 1];
    } else {
      return null;
    }
  });
}
