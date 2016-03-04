import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('current-user');

  this.route('projects', function() {
    this.route('new');
    this.route('show', { path: '/:project_id' });
    this.route('edit', { path: '/:project_id/edit' });
  });
});

export default Router;
