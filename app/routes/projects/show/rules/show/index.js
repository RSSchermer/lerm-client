import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    let rule = this.modelFor('projects.show.rules.show');

    this.transitionTo('projects.show.rules.show.lerm', rule.get('project'), rule);
  }
});
