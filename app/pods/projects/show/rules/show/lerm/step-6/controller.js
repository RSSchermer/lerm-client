import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  rule: alias('model.rule'),

  saveRelationshipTask: task(function *(relationship) {
    yield relationship.save();
  }).drop(),

  deleteRelationshipTask: task(function *(relationship) {
    try {
      relationship.deleteRecord();

      yield relationship.save();
    } catch (error) {
      this.send('error', error);
    }
  }),

  actions: {
    addRelationship() {
      this.store.createRecord('rule-relationship', {
        project: this.get('rule.project'),
        ruleOne: this.get('rule')
      });
    }
  }
});
