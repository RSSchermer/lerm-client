import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    let rule = this.modelFor('projects.show.rules.show');

    return RSVP.hash({
      rule: this.store.findRecord('rule', rule.get('id'), { include: 'phrases.data-elements.phrases.rule' }),
      conflicts: rule.get('project.ruleConflicts'),
      relationships: rule.get('project.ruleRelationships')
    });
  }
});
