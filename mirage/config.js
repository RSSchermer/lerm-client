import Mirage from 'ember-cli-mirage';
import qs from 'npm:qs';

export default function() {
  this.urlPrefix = '';

  // OAuth routes

  this.namespace = 'oauth';

  this.post('/token', (schema, request) => {
    let params = qs.parse(request.requestBody);

    if (params.grant_type === 'password' &&
        params.password === 'valid_password') {
      let resourceOwner = schema.db.users.firstOrCreate({ email: params.username }, {
        username: 'current_user',
        firstName: 'Current',
        lastName: 'User'
      });

      let token = schema.accessToken.create({
        accessToken: '824228db73ee5cc495af0716c644374b308c94dc71dff13ed3d8419a7bca1eeb',
        tokenType: 'bearer',
        resourceOwnerId: resourceOwner.id,
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
    let accessTokens = schema.accessToken.all();

    if (accessTokens.length > 0) {
      let accessToken = accessTokens[accessTokens.length - 1];

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

  this.get('/users', function(schema, request) {
    // TODO: remove workaround when ember-cli-mirage support the filter param out of the box
    let users = schema.user.all();
    let emailFilter = request.queryParams['filter[email]'];

    if (emailFilter) {
      return users.filter((u) => u.email === emailFilter);
    } else {
      return users;
    }
  });
  this.get('/users/:id');

  this.get('/projects');
  this.get('/projects/:id');
  this.post('/projects');
  this.put('/projects/:id');
  this.patch('/projects/:id');

  this.get('/memberships');
  this.get('/memberships/:id');
  this.post('/memberships');
  this.put('/memberships/:id');
  this.patch('/memberships/:id');
  this.delete('/memberships/:id');

  this.get('/data-elements');
  this.get('/data-elements/:id');
  this.post('/data-elements');
  this.put('/data-elements/:id');
  this.patch('/data-elements/:id');
  this.delete('/data-elements/:id');

  this.get('/rules');
  this.get('/rules/:id');
  this.post('/rules');
  this.put('/rules/:id');
  this.patch('/rules/:id');
  this.delete('/rules/:id');

  this.get('/phrases');
  this.get('/phrases/:id');
  this.post('/phrases');
  this.put('/phrases/:id');
  this.patch('/phrases/:id');
  this.delete('/phrases/:id');

  this.get('/statements');
  this.get('/statements/:id');
  this.post('/statements');
  this.put('/statements/:id');
  this.patch('/statements/:id');
  this.delete('/statements/:id');

  this.get('/rule-conflicts');
  this.get('/rule-conflicts/:id');
  this.post('/rule-conflicts');
  this.put('/rule-conflicts/:id');
  this.patch('/rule-conflicts/:id');
  this.delete('/rule-conflicts/:id');

  this.get('/rule-relationships');
  this.get('/rule-relationships/:id');
  this.post('/rule-relationships');
  this.put('/rule-relationships/:id');
  this.patch('/rule-relationships/:id');
  this.delete('/rule-relationships/:id');
}
