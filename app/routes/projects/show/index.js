import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel: function() {
    this.transitionTo('projects.show.rules.index', this.modelFor('projects.show'));
  }
});
