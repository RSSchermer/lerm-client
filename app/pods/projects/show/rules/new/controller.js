import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, inject, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  flashMessages: inject.service(),

  rule: alias('model'),

  createRuleTask: task(function *() {
    let rule = yield this.get('rule').save();

    this.get('flashMessages').success('The rule was added successfully.');
    this.transitionToRoute('projects.show.rules.show', rule.get('project'), rule);
  }).drop()
});
