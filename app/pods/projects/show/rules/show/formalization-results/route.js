import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    let rule = this.modelFor('projects.show.rules.show');

    return this.store.findRecord('rule', rule.get('id'), { include: 'phrases.data-elements' });
  }
});
