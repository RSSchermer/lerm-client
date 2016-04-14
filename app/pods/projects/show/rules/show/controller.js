import Ember from 'ember';
import { task } from 'ember-concurrency';
import FormalizationStatus from 'lerm-client/enums/formalization-status';

const { Controller, inject, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  flashMessages: inject.service(),

  rule: alias('model'),

  project: alias('rule.project'),

  showDeleteModal: false,

  deleteRuleTask: task(function *() {
    let project = this.get('project');

    yield this.get('rule').destroyRecord();

    this.get('flashMessages').success('The rule was deleted successfully.');
    this.transitionToRoute('projects.show.rules.index', project);
  }).drop(),

  actions: {
    toggleDeleteModal() {
      this.toggleProperty('showDeleteModal');
    },

    setStatusUnfinished() {
      let rule = this.get('rule');

      rule.set('formalizationStatus', FormalizationStatus.UNFINISHED);
      rule.save();
    },

    setStatusUnimplementable() {
      let rule = this.get('rule');

      rule.set('formalizationStatus', FormalizationStatus.UNIMPLEMENTABLE);
      rule.save();
    },

    setStatusPartiallyImplemented() {
      let rule = this.get('rule');

      rule.set('formalizationStatus', FormalizationStatus.PARTIALLY_IMPLEMENTED);
      rule.save();
    },

    setStatusFullyImplemented() {
      let rule = this.get('rule');

      rule.set('formalizationStatus', FormalizationStatus.FULLY_IMPLEMENTED);
      rule.save();
    }
  }
});
