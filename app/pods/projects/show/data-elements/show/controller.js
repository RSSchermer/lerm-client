import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, inject, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  flashMessages: inject.service(),

  dataElement: alias('model'),

  project: alias('dataElement.project'),

  showDeleteModal: false,

  deleteDataElementTask: task(function *() {
    try {
      let project = this.get('project');

      yield this.get('dataElement').destroyRecord();

      this.get('flashMessages').success('The data element was deleted successfully.');
      this.transitionToRoute('projects.show.data-elements.index', project);
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
