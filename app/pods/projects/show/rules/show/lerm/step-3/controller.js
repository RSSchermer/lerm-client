import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  rule: alias('model.rule'),

  saveConflictTask: task(function *(conflict) {
    yield conflict.save();
  }).drop(),

  deleteConflictTask: task(function *(conflict) {
    conflict.deleteRecord();

    yield conflict.save();
  }),

  actions: {
    addConflict() {
      this.store.createRecord('rule-conflict', {
        project: this.get('rule.project'),
        ruleOne: this.get('rule')
      });
    }
  }
});
