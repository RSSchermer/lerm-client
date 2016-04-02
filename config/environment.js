/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'lerm-client',
    podModulePrefix: 'lerm-client/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
        'ds-finder-include': true,
        'ds-references': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'current-user',
    routeIfAlreadyAuthenticated: 'current-user'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.SERVER_HOST = 'http://localhost:3000';
    ENV.APP.API_NAMESPACE = 'api/v1';
    ENV.APP.SERVER_TOKEN_ENDPOINT = ENV.APP.SERVER_HOST + '/oauth/token';

    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.APP.SERVER_HOST = '';
    ENV.APP.API_NAMESPACE = 'api/v1';
    ENV.APP.SERVER_TOKEN_ENDPOINT = ENV.APP.SERVER_HOST + '/oauth/token';
  }

  if (environment === 'production') {
    ENV.APP.SERVER_HOST = 'https://lerm-server.herokuapp.com';
    ENV.APP.API_NAMESPACE = 'api/v1';
    ENV.APP.SERVER_TOKEN_ENDPOINT = ENV.APP.SERVER_HOST + '/oauth/token';
  }

  return ENV;
};
