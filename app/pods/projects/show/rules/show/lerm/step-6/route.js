import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    let rule = this.modelFor('projects.show.rules.show');

    return RSVP.hash({
      rule,
      relationships: rule.get('project.ruleRelationships'),
      rules: rule.get('project.rules')
    });
  }
});
