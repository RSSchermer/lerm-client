import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, inject, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  flashMessages: inject.service(),

  rule: alias('model'),

  project: alias('rule.project'),

  showDeleteModal: false,

  deleteRuleTask: task(function *() {
    try {
      let project = this.get('project');

      yield this.get('rule').destroyRecord();

      this.get('flashMessages').success('The rule was deleted successfully.');
      this.transitionToRoute('projects.show.rules.index', project);
    } catch (error) {
      this.set('error', error);
    }
  }).drop(),

  actions: {
    toggleDeleteModal() {
      this.toggleProperty('showDeleteModal');
    }
  }
});
