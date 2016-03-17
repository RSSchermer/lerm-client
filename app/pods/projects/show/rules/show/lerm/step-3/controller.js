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
    try {
      conflict.deleteRecord();

      yield conflict.save();
    } catch (error) {
      this.send('error', error);
    }
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
