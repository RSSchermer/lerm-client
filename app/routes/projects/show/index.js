import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    this.transitionTo('projects.show.rules.index', this.modelFor('projects.show'));
  }
});
