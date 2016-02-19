import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('current-user', function () {
    this.route('new-project');
  });

  this.route('projects', function () {
    this.route('show', { path: '/:project_id' });
  });
});

export default Router;
