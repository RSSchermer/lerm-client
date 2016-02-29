import Mirage from 'ember-cli-mirage';
import qs from 'npm:qs';

export default function() {
  this.urlPrefix = '';

  // OAuth routes

  this.namespace = 'oauth';

  this.post('/token', (schema, request) => {
    const params = qs.parse(request.requestBody);

    if (params.grant_type === 'password' &&
        params.password === 'valid_password') {
      const resourceOwner = schema.user.create({
        email: params.username,
        username: 'current_user',
        firstName: 'Current',
        lastName: 'User'
      });

      const token = schema.accessToken.create({
        accessToken: '824228db73ee5cc495af0716c644374b308c94dc71dff13ed3d8419a7bca1eeb',
        tokenType: 'bearer',
        resourceOwnerId: resourceOwner.id,
        scopes: [],
        application: {uid: null},
        expiresIn: 7200,
        createdAt: Math.floor(Date.now() / 1000)
      });

      return {
        'access_token': token.accessToken,
        'token_type': token.tokenType,
        'expires_in': token.expiresIn,
        'created_at': token.createdAt
      };
    } else {
      return new Mirage.Response(401, {}, { error: 'invalid_grant' });
    }
  });

  // Returns information for the most recently created token
  this.get('/token/info', (schema) => {
    // TODO: make pull request on ember mirage to add a last() method
    const accessTokens = schema.accessToken.all();

    if (accessTokens.length > 0) {
      const accessToken = accessTokens[accessTokens.length - 1];

      return {
        'resource_owner_id': accessToken.resourceOwnerId,
        'scopes': accessToken.scopes,
        'application': accessToken.application,
        'expires_in': accessToken.expiresIn,
        'created_at': accessToken.createdAt
      };
    } else {
      return null;
    }
  });

  // API routes

  this.namespace = 'api/v1';

  this.get('/users');
  this.get('/users/:id');

  this.get('/projects');
  this.get('/projects/:id');
  this.post('/projects');
  this.put('/projects/:id');
}
