import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  accessToken: '824228db73ee5cc495af0716c644374b308c94dc71dff13ed3d8419a7bca1eeb',

  tokenType: 'bearer',

  resourceOwnerId: null,

  scopes: [],

  application: { uid: null },

  expiresIn: 7200,

  createdAt: () => Math.floor(Date.now() / 1000)
});
